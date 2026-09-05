import { Request, Response, NextFunction } from 'express';
import { Skill } from '../models/Skill.model.js';
import { SkillSchema } from '../validators/schemas.js';

export async function getSkills(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, includeInactive } = req.query;
    const filter: Record<string, any> = {};

    if (includeInactive !== 'true') {
      filter.status = 'active';
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    const skills = await Skill.find(filter).sort({ category: 1, displayOrder: 1, proficiency: -1 }).lean();
    res.json({ success: true, count: skills.length, data: skills });
  } catch (err) {
    next(err);
  }
}

export async function createSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = SkillSchema.parse(req.body);
    const skill = await Skill.create(validatedData);
    res.status(201).json({ success: true, message: 'Skill created successfully.', data: skill });
  } catch (err) {
    next(err);
  }
}

export async function updateSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const validatedData = SkillSchema.parse(req.body);
    const skill = await Skill.findByIdAndUpdate(id, validatedData, { new: true, runValidators: true });
    if (!skill) {
      res.status(404).json({ success: false, error: 'Skill not found.' });
      return;
    }
    res.json({ success: true, message: 'Skill updated successfully.', data: skill });
  } catch (err) {
    next(err);
  }
}

export async function deleteSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) {
      res.status(404).json({ success: false, error: 'Skill not found.' });
      return;
    }
    res.json({ success: true, message: 'Skill deleted successfully.' });
  } catch (err) {
    next(err);
  }
}
