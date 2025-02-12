import { Request, Response, NextFunction } from 'express';
import { Patient } from '../../models';
import { ApiError } from '../../middleware/error.middleware';

export const getPatients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [patients, total] = await Promise.all([
      Patient.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Patient.countDocuments(),
    ]);
    res.json({
      patients,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};
export const getPatientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) throw new ApiError(404, 'Patient Not Found');
    res.json(patient);
  } catch (error) {
    next(error);
  }
};
export const createPatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    next(new ApiError(400, 'Error creating user', error as Error | ApiError));
  }
};

export const updatePatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patient) throw new ApiError(404, 'Patient Not Found');
    res.json(patient);
  } catch (error) {
    next(error);
  }
};

export const deletePatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      throw new ApiError(404, 'Paciente no encontrado');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
