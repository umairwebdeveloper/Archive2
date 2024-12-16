"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@/components/spinner";
import { useRouter } from "next/navigation";

interface Subject {
  id: string;
  levelId: string;
  imageUrl?: string;
  isPublished: boolean;
  title: string;
  level: Level;
  subjectType?: string;
}

interface Level {
  id: string;
  title: string;
}

const SubjectsAndLevels: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedLevelTitles, setSelectedLevelTitles] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const groupSubjectsByType = (subjects: Subject[]) => {
    return subjects.reduce((acc, subject) => {
      const subjectType = subject.subjectType || "Unknown Type";
      if (!acc[subjectType]) {
        acc[subjectType] = [];
      }
      acc[subjectType].push(subject);
      return acc;
    }, {} as { [key: string]: Subject[] });
  };

  const groupedSubjects = groupSubjectsByType(subjects);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Level[]>("/api/level");
        setLevels(response.data);

        // Check for default selected levels from localStorage
        const storedLevels = localStorage.getItem("userLevels");
        if (storedLevels) {
          const storedLevelTitles = JSON.parse(storedLevels) as string[];
          const normalizedStoredTitles = storedLevelTitles.map((title) =>
            title.toLowerCase()
          );
          const matchingLevels = response.data
            .map((level) => level.title)
            .filter((title) =>
              normalizedStoredTitles.includes(title.toLowerCase())
            );
          setSelectedLevelTitles(matchingLevels);
        }
      } catch (error) {
        console.error("Error fetching levels:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const params = selectedLevelTitles.length
          ? { levels: selectedLevelTitles.join(",") }
          : {};
        const response = await axios.get<Subject[]>("/api/level/subject", {
          params,
        });
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [selectedLevelTitles]);

  const handleLevelChange = (levelTitle: string) => {
    setSelectedLevelTitles((prev) => {
      const updated = prev.includes(levelTitle)
        ? prev.filter((title) => title !== levelTitle) // Remove if already selected
        : [...prev, levelTitle]; // Add if not selected

      // Normalize and save updated list to localStorage
      const normalizedUpdated = updated.map((title) => title.toLowerCase());
      return updated;
    });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center my-5">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="pb-5">
      <div className="flex flex-wrap justify-start gap-3 mb-4">
        {/* All Levels Option */}
        <label
          className={`py-2 px-3 text-sm border border-sec600 rounded-full flex items-center gap-x-1 hover:border-sec700 transition cursor-pointer ${
            selectedLevelTitles.length === 0 &&
            "bg-prim400 text-prim50 border-none"
          }`}
        >
          <input
            type="checkbox"
            name="level"
            value="all"
            checked={selectedLevelTitles.length === 0}
            onChange={() => {
              setSelectedLevelTitles([]);
            }}
            className="me-2"
          />
          All Levels
        </label>
        {/* Individual Level Options */}
        {levels.map((level) => (
          <label
            key={level.id}
            className={`py-2 px-3 text-sm border border-sec600 rounded-full flex items-center gap-x-1 hover:border-sec700 transition cursor-pointer ${
              selectedLevelTitles.includes(level.title) &&
              "bg-prim400 text-prim50 border-none"
            }`}
          >
            <input
              type="checkbox"
              name="level"
              value={level.title}
              checked={selectedLevelTitles.includes(level.title)}
              onChange={() => handleLevelChange(level.title)}
              className="me-2"
            />
            {level.title}
          </label>
        ))}
      </div>

      {/* Subjects Grid */}
      {Object.keys(groupedSubjects).length === 0 ? (
        <p className="text-center my-4">No Subjects found</p>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedSubjects).map(
            ([subjectType, subjectsInGroup]) => (
              <div key={subjectType}>
                {/* SubjectType Title */}
                <h2 className="text-2xl font-bold mb-4">{subjectType}</h2>

                {/* Subjects Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                  {subjectsInGroup.map((subject) => (
                    <div
                      key={subject.id}
                      className="border rounded-2xl overflow-hidden shadow transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer"
                      onClick={() =>
                        router.push(`/vakken/subject/${subject.id}`)
                      }
                    >
                      {subject.imageUrl ? (
                        <img
                          src={`${
                            subject.imageUrl.startsWith("https")
                              ? subject.imageUrl
                              : "/uploads/" + subject.imageUrl
                          }`}
                          alt={subject.title}
                          className="mb-4 w-full h-48 object-cover rounded-md"
                        />
                      ) : (
                        <div className="bg-gray-400 h-48 w-full rounded-md">
                          <div className="flex items-center justify-center h-full text-white text-2xl font-bold">
                            {subject.title[0]}
                          </div>
                        </div>
                      )}
                      <div className="px-6 py-2">
                        <div className="font-bold text-xl mb-2">
                          {subject.title} - {subject.level.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SubjectsAndLevels;
