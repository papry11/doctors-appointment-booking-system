import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import DoctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.json({ success: false, message: "Missing details" });
        }

        //  Email validation
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        //  Password strength check
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        //  Check if email already exists
        const isExist = await DoctorModel.findOne({ email });
        if (isExist) {
            return res.json({ success: false, message: "Doctor already exists with this email" });
        }

        //  Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //  Upload image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image"
        });
        const imageUrl = uploadedImage.secure_url;

        //  Save doctor to database
        const newDoctor = new DoctorModel({
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            image: imageUrl,
            date:Date.now()
        });

        
        await newDoctor.save();

        res.status(201).json({
            success: true,
            message: "Doctor added successfully",
            doctor: newDoctor
        });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Internal server error" });
    }
};


// API for admin login

const loginAdmin = async (req,res) => {
    try {

        const { email, password } = req.body
        
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({success:true,token})

        } else {
            console.error(error);
            res.json({success:false , message:"Invalid credentials"})
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

//  API to get all doctor list for admin panel

const allDoctors = async (req, res) => {
    try {
        
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})



    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Api to get all appointment list


const appointmentsAdmin = async (req, res) => {
    try {

        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


// api for appointment cancellation


const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        
        await appointmentModel.findByIdAndUpdate(appointmentId , {cancelled:true})

        // relasing doctor slot

        const { docId, slotDate, slotTime } = appointmentData
        
        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success:true , message:'Appointment Cancelled'})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// Api to get dashboard data for admin panel


const adminDashboard = async (req, res) => {
    try {

        const doctors = await doctorModel.find()
        const users = await userModel.find()
        const appointments = await appointmentModel.find()


        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData})

        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}




export { addDoctor , loginAdmin , allDoctors , appointmentsAdmin , appointmentCancel , adminDashboard };

