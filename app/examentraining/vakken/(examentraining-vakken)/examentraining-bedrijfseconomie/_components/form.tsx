"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

interface FormData {
	fullName: string;
	email: string;
	phone: string;
	studentName: string;
	educationType: string;
	schoolYear: string;
	tutoringSubjects: string;
	address: string;
	postalCode: string;
}

const initialFormData: FormData = {
	fullName: "",
	email: "",
	phone: "",
	studentName: "",
	educationType: "",
	schoolYear: "",
	tutoringSubjects: "",
	address: "",
	postalCode: "",
};

const Form = () => {
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [loading, setLoading] = useState<boolean>(false);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post("/api/toturing", { formData });
			console.log(response.data);
			setFormData(initialFormData);
            toast.success("Form submitted successfully!");
		} catch (error) {
			console.error("Failed to save data", error);
            toast.error("Failed to submit form");
		} finally {
			setLoading(false);
		}
	};

	const renderInput = (
		label: string,
		name: keyof FormData,
		type: string = "text"
	) => (
		<div className="mb-4">
			<label className="block text-gray-700">{label}</label>
			<input
				type={type}
				name={name}
				value={formData[name]}
				onChange={handleChange}
				className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
			/>
		</div>
	);

	const renderSelect = (
		label: string,
		name: keyof FormData,
		options: string[]
	) => (
		<div className="mb-4">
			<label className="block text-gray-700">{label}</label>
			<select
				name={name}
				value={formData[name]}
				onChange={handleChange}
				className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			>
				<option value="">Select {label}</option>
				{options.map((option) => (
					<option key={option} value={option.toLowerCase()}>
						{option}
					</option>
				))}
			</select>
		</div>
	);

	return (
		<>
			<h3 className="text-center text-2xl font-semibold mb-4">
				Tutoring Form
			</h3>
			<form
				onSubmit={handleSubmit}
				className="max-w-lg mx-auto p-5 bg-gr1 shadow-sm rounded mb-5"
			>
				{renderInput("Full Name", "fullName")}
				{renderInput("Email", "email", "email")}
				{renderInput("Phone", "phone", "tel")}
				{renderInput("Name of Student", "studentName")}
				{renderSelect("Type of Education", "educationType", [
					"Primary School",
					"VMBO",
					"HAVO",
					"VWO",
					"HBO",
					"WO",
				])}
				{renderSelect("School Year", "schoolYear", [
					"1",
					"2",
					"3",
					"4",
					"5",
					"6",
					"7",
					"8",
				])}
				{renderInput("Tutoring Subject(s)", "tutoringSubjects")}
				{renderInput("Address", "address")}
				{renderInput("Postal Code", "postalCode")}
				<Button type="submit" disabled={loading}>
					{loading ? "Sending..." : "Send"}
				</Button>
			</form>
		</>
	);
};

export default Form;
