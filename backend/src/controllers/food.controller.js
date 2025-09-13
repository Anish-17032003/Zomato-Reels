const foodModel=require('../models/fooditem.model');
require("dotenv").config();
const storageService=require('../services/storage.service');
const { v4: uuid}=require('uuid');
const likeModel=require('../models/likes.model')
const saveModel=require('../models/save.model')


async function createFood(req,res){
        
    const fileUploadResult=await storageService.uploadFile(req.file.buffer,uuid())  //package for storimg unique id npm i uuid
    
    const foodItem = await foodModel.create({
  name: req.body.name,
  description: req.body.description,
  video: fileUploadResult.url,  // public URL from ImageKit
  foodPartner: req.foodPartner._id
});
    res.status(201).json({
        message:"Food item created successfully",
        food: foodItem
    })
} 

async function getFoodItems(req,res){
    const foodItems=await foodModel.find({})
    res.status(200).json({
        message:"Food items fetched successfully",
        foodItems
    })
}

async function likeFood(req,res){
    try {
        const { foodId } = req.body;
        const user = req.user;

        if (!user) return res.status(401).json({ message: 'Please login first' });
        if (!foodId) return res.status(400).json({ message: 'foodId is required' });

        const isAlreadyLiked = await likeModel.findOne({ food: foodId, user: user._id });
        if (isAlreadyLiked) {
            // remove like and decrement counter
            await likeModel.deleteOne({ user: user._id, food: foodId });
            const updated = await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } }, { new: true }).lean();
            if (updated && Number(updated.likeCount || 0) < 0) {
                await foodModel.findByIdAndUpdate(foodId, { $set: { likeCount: 0 } });
                updated.likeCount = 0;
            }
            return res.status(200).json({
                message: 'Food item unliked successfully',
                like: false,
                likeCount: updated ? Number(updated.likeCount || 0) : 0
            });
        }

        // try to create like; handle duplicate-key race by treating as success
        try {
            const like = await likeModel.create({ user: user._id, food: foodId });
            const updated = await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } }, { new: true }).lean();
            return res.status(201).json({
                message: 'Food item liked successfully',
                like: true,
                like,
                likeCount: updated ? Number(updated.likeCount || 0) : 0
            });
        } catch (err) {
            // duplicate key error means another request already created the like — still increment counter and return new count
            if (err && err.code === 11000) {
                const updated = await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } }, { new: true }).lean();
                return res.status(201).json({
                    message: 'Food item liked successfully',
                    like: true,
                    likeCount: updated ? Number(updated.likeCount || 0) : 0
                });
            }
            throw err;
        }
    } catch (err) {
        console.error('likeFood error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}

async function saveFood(req,res){
    try {
        const {foodId}=req.body;
        const user=req.user;

        console.log('saveFood called, user:', user && user._id, 'foodId:', foodId);

        if (!user) return res.status(401).json({ message: 'Please login first' });
        if (!foodId) return res.status(400).json({ message: 'foodId is required' });

        const isAlreadySaved=await saveModel.findOne({
            user:user._id,
            food:foodId
        })
        if(isAlreadySaved){
            await saveModel.deleteOne({
                user:user._id,
                food:foodId
            })
            // return current count for convenience (attempt to decrement but skip if food doesn't track savesCount)
            let saveCount = undefined
            try {
                const updated = await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: -1 } }, { new: true }).lean();
                if (updated) {
                    if (updated.savesCount < 0) {
                        await foodModel.findByIdAndUpdate(foodId, { $set: { savesCount: 0 } });
                        updated.savesCount = 0;
                    }
                    saveCount = Number(updated.savesCount || 0)
                }
            } catch (e) {
                // ignore if food doesn't have savesCount field
            }
            return res.status(200).json({
                message:"Food unsaved successfully",
                save: false,
                saveCount
            })
        }
        const save=await saveModel.create({
            user:user._id,
            food:foodId
        })
        console.log('save created:', save && save._id);
        // try to increment savesCount if the food supports it
        let saveCount = undefined
        try {
            const updated = await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: 1 } }, { new: true }).lean();
            if (updated) saveCount = Number(updated.savesCount || 0)
        } catch (e) {
            // ignore
        }
        res.status(201).json({
            message:"Food saved successfully",
            save,
            save: true,
            saveCount
        })
    } catch (err) {
        console.error('saveFood error:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getSavedFoods(req, res) {
    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food').lean();

    // filter out any saves where the referenced food no longer exists
    const filtered = Array.isArray(savedFoods) ? savedFoods.filter(s => s.food) : [];

    if (!filtered.length) {
        return res.status(200).json({
            message: "No saved foods found",
            savedFoods: []
        });
    }

    res.status(200).json({
        message: "Saved foods fetched successfully",
        savedFoods: filtered
    });
}


module.exports={
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSavedFoods
    
    
}