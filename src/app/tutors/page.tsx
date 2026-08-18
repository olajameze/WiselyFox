"use client";

import { useState, useMemo } from "react";
import { TutorCardGrid } from "@/shared/lib/TutorCardGrid";
import type { TutorCardData } from "@/features/tutors/actions/getTutors";
import { getAllSubjects } from "@/data/curriculum";
import { AGE_BANDS, AGE_BAND_LABELS } from "@/data/age-bands";
import styles from "./TutorsPage.module.css";

// This component will now fetch data on the client side for filtering.
// A future enhancement would be to pass filters to a server action.
export default function TutorsPage() {
  const [tutors, setTutors] = useState<TutorCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedAgeBand, setSelectedAgeBand] = useState<string>("");

  // Fetch initial data on component mount
  useState(() => {
    // We need to create an async function inside here to call the server action
    const fetchTutors = async () => {
      // Because getTutors is a server action, we need to import it differently
      // for client-side usage. This will be handled by the bundler.
      const { getTutors } = await import("@/features/tutors/actions/getTutors");
      const allTutors = await getTutors();
      setTutors(allTutors);
      setLoading(false);
    };
    fetchTutors();
  }, []);

  const allSubjects = useMemo(() => getAllSubjects().map(s => s.title).sort(), []);

  const filteredTutors = useMemo(() => {
    return tutors.filter(tutor => {
      const subjectMatch = selectedSubject ? tutor.subjectTags.includes(selectedSubject) : true;
      const ageBandMatch = selectedAgeBand ? tutor.ageBands.includes(selectedAgeBand) : true;
      return subjectMatch && ageBandMatch;
    });
  }, [tutors, selectedSubject, selectedAgeBand]);

  return (
    <div className="container">
      <header className="page-header">
        <h1>Meet Our Tutors</h1>
        <p className="subtitle">A team of dedicated and experienced educators ready to guide your learning journey.</p>
      </header>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="subject-filter">Filter by Subject:</label>
          <select
            id="subject-filter"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Subjects</option>
            {allSubjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="age-band-filter">Filter by Age Band:</label>
          <select
            id="age-band-filter"
            value={selectedAgeBand}
            onChange={(e) => setSelectedAgeBand(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Ages</option>
            {AGE_BANDS.map(band => (
              <option key={band} value={band}>{AGE_BAND_LABELS[band]}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingState}>Loading tutors...</div>
      ) : (
        <TutorCardGrid tutors={filteredTutors} />
      )}
    </div>
  );
}
