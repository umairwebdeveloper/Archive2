// components/CourseList.tsx
import React, { useState, useEffect } from "react";
import Select from "react-select";

// Define the type for course data
type CourseData = {
	id: number;
	title: string;
	description: string;
	level: "HAVO" | "VWO";
	location: string;
	date: string;
};

// Example data array
const courses: CourseData[] = [
	{
		id: 1,
		title: "Mathematics",
		description: "Advanced Math course",
		level: "HAVO",
		location: "Amsterdam",
		date: "2024-01-15",
	},
	{
		id: 2,
		title: "Physics",
		description: "Physics fundamentals",
		level: "VWO",
		location: "Rotterdam",
		date: "2024-02-10",
	},
	{
		id: 3,
		title: "Biology",
		description: "Biology in depth",
		level: "HAVO",
		location: "Utrecht",
		date: "2024-03-05",
	},
	{
		id: 4,
		title: "Chemistry",
		description: "Chemical processes",
		level: "VWO",
		location: "Amsterdam",
		date: "2024-04-18",
	},
	// Add more courses as needed
];

// Generate unique options for subjects and locations
const subjectOptions = Array.from(
	new Set(courses.map((course) => course.title))
).map((subject) => ({ value: subject, label: subject }));
const locationOptions = Array.from(
	new Set(courses.map((course) => course.location))
).map((location) => ({ value: location, label: location }));
const sortOptions = [
	{ value: "date_asc", label: "Date (Ascending)" },
	{ value: "date_desc", label: "Date (Descending)" },
	{ value: "title_asc", label: "Subject (A-Z)" },
	{ value: "title_desc", label: "Subject (Z-A)" },
	{ value: "location_asc", label: "Location (A-Z)" },
	{ value: "location_desc", label: "Location (Z-A)" },
];

const CourseList: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedLevel, setSelectedLevel] = useState<"HAVO" | "VWO" | "">("");
	const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
	const [selectedLocation, setSelectedLocation] = useState("");
	const [sortOption, setSortOption] = useState(sortOptions[0].value);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 2;

	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => setLoading(false), 500); // Simulate a loading delay
		return () => clearTimeout(timer);
	}, [
		searchTerm,
		selectedLevel,
		selectedSubjects,
		selectedLocation,
		sortOption,
		currentPage,
	]);

	// Convert search term to lowercase for case-insensitive comparison
	const lowercasedSearchTerm = searchTerm.toLowerCase();

	// Handle level filter
	const handleLevelFilter = (level: "HAVO" | "VWO") => {
		setSelectedLevel(selectedLevel === level ? "" : level);
		setCurrentPage(1); // Reset to first page on new filter
	};

	// Handle subject selection with react-select
	const handleSubjectChange = (selectedOptions: any) => {
		setSelectedSubjects(
			selectedOptions
				? selectedOptions.map((option: any) => option.value)
				: []
		);
		setCurrentPage(1); // Reset to first page on new filter
	};

	// Handle location selection with react-select
	const handleLocationChange = (selectedOption: any) => {
		setSelectedLocation(selectedOption ? selectedOption.value : "");
		setCurrentPage(1); // Reset to first page on new filter
	};

	// Handle sort selection with react-select
	const handleSortChange = (selectedOption: any) => {
		setSortOption(selectedOption.value);
	};

	// Sorting logic based on selected option
	const sortedCourses = [...courses].sort((a, b) => {
		const [sortCriteria, sortOrder] = sortOption.split("_");
		const compareA =
			sortCriteria === "date"
				? new Date(a.date).getTime()
				: a[sortCriteria as keyof CourseData].toString().toLowerCase();
		const compareB =
			sortCriteria === "date"
				? new Date(b.date).getTime()
				: b[sortCriteria as keyof CourseData].toString().toLowerCase();
		if (compareA < compareB) return sortOrder === "asc" ? -1 : 1;
		if (compareA > compareB) return sortOrder === "asc" ? 1 : -1;
		return 0;
	});

	// Filter courses based on search term, level, subjects, and location
	const filteredCourses = sortedCourses.filter((course) => {
		const matchesSearch =
			course.title.toLowerCase().includes(lowercasedSearchTerm) ||
			course.description.toLowerCase().includes(lowercasedSearchTerm) ||
			course.date.includes(lowercasedSearchTerm) ||
			course.id.toString().includes(lowercasedSearchTerm);

		const matchesLevel = selectedLevel
			? course.level === selectedLevel
			: true;
		const matchesSubject =
			selectedSubjects.length > 0
				? selectedSubjects.includes(course.title)
				: true;
		const matchesLocation = selectedLocation
			? course.location === selectedLocation
			: true;

		return (
			matchesSearch && matchesLevel && matchesSubject && matchesLocation
		);
	});

	// Calculate pagination
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentCourses = filteredCourses.slice(
		indexOfFirstItem,
		indexOfLastItem
	);
	const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className="p-4">
			<div className="container">
				<div className="rounded-2xl w-50">
						jkjk
				</div>
			</div>
			<input
				type="text"
				placeholder="Search by title, description, or date..."
				className="mb-4 p-2 border rounded w-full"
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			<div className="flex gap-2 mb-4">
				<button
					className={`px-4 py-2 rounded ${
						selectedLevel === "HAVO"
							? "bg-blue-500 text-white"
							: "bg-gray-300"
					}`}
					onClick={() => handleLevelFilter("HAVO")}
				>
					HAVO
				</button>
				<button
					className={`px-4 py-2 rounded ${
						selectedLevel === "VWO"
							? "bg-blue-500 text-white"
							: "bg-gray-300"
					}`}
					onClick={() => handleLevelFilter("VWO")}
				>
					VWO
				</button>
			</div>

			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					Filter by Subjects
				</label>
				<Select
					options={subjectOptions}
					isMulti
					onChange={handleSubjectChange}
					placeholder="Select subjects..."
				/>
			</div>

			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					Filter by Location
				</label>
				<Select
					options={locationOptions}
					onChange={handleLocationChange}
					placeholder="Select location..."
					isClearable
				/>
			</div>

			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					Sort by
				</label>
				<Select
					options={sortOptions}
					onChange={handleSortChange}
					defaultValue={sortOptions[0]}
				/>
			</div>

			{loading ? (
				<p className="text-center text-gray-500">Loading...</p>
			) : (
				<div>
					{currentCourses.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
							{currentCourses.map((course) => (
								<div
									key={course.id}
									className="bg-white shadow-lg rounded-lg p-4"
								>
									<h2 className="text-lg font-semibold mb-2">
										{course.title}
									</h2>
									<p className="text-gray-600">
										{course.description}
									</p>
									<p className="text-gray-500 text-sm">
										Level: {course.level}
									</p>
									<p className="text-gray-500 text-sm">
										Location: {course.location}
									</p>
									<p className="text-gray-400 text-sm">
										Date: {course.date}
									</p>
									<p className="text-gray-400 text-sm">
										ID: {course.id}
									</p>
								</div>
							))}
						</div>
					) : (
						<p className="text-center text-gray-500">
							No results found.
						</p>
					)}
					<div className="flex justify-center mt-4">
						{Array.from(
							{ length: totalPages },
							(_, i) => i + 1
						).map((page) => (
							<button
								key={page}
								onClick={() => handlePageChange(page)}
								className={`mx-1 px-3 py-1 border rounded ${
									page === currentPage
										? "bg-blue-500 text-white"
										: "bg-gray-300"
								}`}
							>
								{page}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default CourseList;
