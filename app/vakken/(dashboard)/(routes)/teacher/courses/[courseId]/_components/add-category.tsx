"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddCategoryForm: React.FC = () => {
	const [categoryName, setCategoryName] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCategoryName(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsSubmitting(true);
		try {
			// Simulate API call
			const response = await fetch("/api/categories", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: categoryName }),
			});
			if (!response.ok) {
				toast.error("Failed to add category");
			}
            const result = await response.json();
			toast.success("Category added successfully");
            router.refresh();
			setCategoryName("");
		} catch (error) {
			toast.error("Failed to add category");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form className="space-y-4 mt-4" onSubmit={handleSubmit}>
			<div className="flex items-center gap-x-2">
				<input
					type="text"
					className="p-2 rounded-md border"
					placeholder="Enter Category name"
					value={categoryName}
					onChange={handleInputChange}
					disabled={isSubmitting}
					required
				/>
			</div>
			<div className="flex items-center gap-x-2">
				<button
					type="submit"
					className="p-2 bg-gray-900 text-white rounded-md"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Saving..." : "Save"}
				</button>
			</div>
		</form>
	);
};

export default AddCategoryForm;
