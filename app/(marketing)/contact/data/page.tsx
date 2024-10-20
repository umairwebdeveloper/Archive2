"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "@/components/spinner";

const TutoringFormTable = () => {
	const [formData, setFormData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true); // Loading state for table data
	const [deletingId, setDeletingId] = useState<number | null>(null); // Loading state for delete button

	useEffect(() => {
		const fetchFormData = async () => {
			try {
				const res = await axios.get("/api/toturing/");
				setFormData(res.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false); // Set loading to false once data is fetched
			}
		};

		fetchFormData();
	}, []);

	const handleDelete = async (id: number) => {
		setDeletingId(id); // Set the ID of the deleting item
		try {
			await axios.delete(`/api/toturing/?id=${id}`);
			setFormData((prevData) =>
				prevData.filter((form) => form.id !== id)
			);
		} catch (error) {
			console.error("Error deleting form data:", error);
		} finally {
			setDeletingId(null); // Reset deleting ID after the process
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4 text-center">
				Tutoring Form Data
			</h1>
			<div className="overflow-x-auto">
				<table className="min-w-full table-auto border-collapse">
					<thead>
						<tr>
							<th className="px-4 py-2 border">Full Name</th>
							<th className="px-4 py-2 border">Email</th>
							<th className="px-4 py-2 border">Phone</th>
							<th className="px-4 py-2 border">Student Name</th>
							<th className="px-4 py-2 border">Education Type</th>
							<th className="px-4 py-2 border">School Year</th>
							<th className="px-4 py-2 border">
								Tutoring Subject
							</th>
							<th className="px-4 py-2 border">Address</th>
							<th className="px-4 py-2 border">Postal Code</th>
							<th className="px-4 py-2 border">Actions</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td
									colSpan={10}
									className="text-center px-4 py-2 border"
								>
									Loading data...
								</td>
							</tr>
						) : formData.length === 0 ? (
							<tr>
								<td
									colSpan={10}
									className="text-center px-4 py-2 border"
								>
									No data found.
								</td>
							</tr>
						) : (
							formData.map((form: any, index) => (
								<tr key={index} className="hover:bg-gray-100">
									<td className="px-4 py-2 border">
										{form.fullName}
									</td>
									<td className="px-4 py-2 border">
										{form.email}
									</td>
									<td className="px-4 py-2 border">
										{form.phone}
									</td>
									<td className="px-4 py-2 border">
										{form.studentName}
									</td>
									<td className="px-4 py-2 border">
										{form.educationType}
									</td>
									<td className="px-4 py-2 border">
										{form.schoolYear}
									</td>
									<td className="px-4 py-2 border">
										{form.tutoringSubjects}
									</td>
									<td className="px-4 py-2 border">
										{form.address}
									</td>
									<td className="px-4 py-2 border">
										{form.postalCode}
									</td>
									<td className="px-4 py-2 border">
										<button
											onClick={() =>
												handleDelete(form.id)
											}
											className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
											disabled={deletingId === form.id} // Disable button during delete
										>
											{deletingId === form.id
												? "Deleting..."
												: "Delete"}
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TutoringFormTable;
