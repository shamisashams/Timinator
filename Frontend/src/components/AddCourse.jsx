import React, { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/courses";

const AddCourse = ({ active }) => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editingId, setEditingId] = useState(null); // null = add mode

  // load courses when tab is active
  useEffect(() => {
    if (!active) return;

    const fetchCourses = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Error loading courses", err);
      }
    };

    fetchCourses();
  }, [active]);

  const resetForm = () => {
    setCourseName("");
    setProjectName("");
    setDeadline("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      course_name: courseName,
      project_name: projectName,
      deadline: deadline,
    };

    try {
      let res;
      if (editingId === null) {
        // create
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        // update
        res = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      const saved = await res.json();
      if (!res.ok) {
        console.error("Server error", saved);
        return;
      }

      if (editingId === null) {
        setCourses((prev) => [...prev, saved]);
      } else {
        setCourses((prev) =>
          prev.map((c) => (c.id === saved.id ? saved : c))
        );
      }

      resetForm();
    } catch (err) {
      console.error("Error saving course", err);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this course?");
    if (!ok) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        console.error("Error deleting course");
        return;
      }
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting course", err);
    }
  };

  const handleEdit = (course) => {
    setCourseName(course.course_name);
    setProjectName(course.project_name);
    setDeadline(course.deadline || "");
    setEditingId(course.id);
  };

  return (
    <div className={`${active ? "block" : "hidden"} w-full`}>
      <div className="bg-gradient border-3 border-transparent max-w-3xl rounded-2xl mx-auto">
        <div className="bg-white p-5 pb-10 rounded-2xl ">
          <div className="text-center mb-10">
            <h2>Add New Course</h2>
            <div className="opacity-50">
              Create a new course to organize your study schedule
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label>Course Topic</label>
            <input
              type="text"
              placeholder="eg. Advanced Mathematics, Web Development"
              className="w-full mb-4"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />

            <label>Project</label>
            <input
              type="text"
              placeholder="eg. Final Exam Preparation, Portfolio Website"
              className="w-full mb-4"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />

            <label>Deadline</label>
            <input
              type="date"
              className="w-full mb-4"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />

            <button className="bg-blue p-5 w-full font-bold mt-2 cursor-pointer" type="submit">
              {editingId === null ? "Add Course" : "Update Course"}
            </button>
          </form>

          <div className="grid lg:grid-cols-3 sm:grid-cols-2 mt-10 gap-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-green-50 p-4">
                <p>
                  <b>{course.course_name}</b>
                </p>
                <div>{course.project_name}</div>
                <div>Deadline: {course.deadline}</div>

                <div className="flex gap-2 mt-4">
                  <button
                    className="bg-yellow-300 p-2 font-bold text-xs cursor-pointer"
                    type="button"
                    onClick={() => handleEdit(course)}
                  >
                    Edit course
                  </button>
                  <button
                    className="bg-red-300 p-2 font-bold text-xs cursor-pointer"
                    type="button"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete course
                  </button>
                </div>
              </div>
            ))}

            {courses.length === 0 && (
              <div className="text-sm text-gray-500">
                No courses yet. Add your first course above.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
