import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/Layout';
import StatsCard from '../../../components/ui/StatsCard';
import Toast from '../../../components/ui/Toast';
import { PageLoader } from '../../../components/ui/Spinner';
import { subjectsAPI } from '../../../lib/api';
import { useAuth } from '../../../hooks/useAuth';

const EmptyState = ({ title, description }) => (
  <div className="card p-8 text-center">
    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neon-violet/10 text-2xl">✨</div>
    <h3 className="font-display text-xl font-bold text-text-primary dark:text-text-primary-dark">{title}</h3>
    <p className="mt-2 text-sm text-text-secondary dark:text-text-secondary-dark">{description}</p>
  </div>
);


const iconProps = {
  className: 'h-6 w-6',
  fill: 'none',
  viewBox: '0 0 24 24',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

const CourseIcon = () => (
  <svg {...iconProps}>
    <path d="M4.5 5.75A2.25 2.25 0 016.75 3.5h4.75v16.75H6.75a2.25 2.25 0 00-2.25 2.25V5.75z" />
    <path d="M19.5 5.75a2.25 2.25 0 00-2.25-2.25H12.5v16.75h4.75a2.25 2.25 0 012.25 2.25V5.75z" />
    <path d="M7.25 7.25h2.5M14.25 7.25h2.5M7.25 10.25h2.5M14.25 10.25h2.5" />
  </svg>
);

const LessonIcon = () => (
  <svg {...iconProps}>
    <rect x="3.75" y="5" width="16.5" height="14" rx="2.25" />
    <path d="M10.25 9.25v5.5l4.75-2.75-4.75-2.75z" />
    <path d="M7 5V3.75M17 5V3.75M7 20.25V19M17 20.25V19" />
  </svg>
);

const StudentsIcon = () => (
  <svg {...iconProps}>
    <path d="M8.75 11.25a3.25 3.25 0 100-6.5 3.25 3.25 0 000 6.5z" />
    <path d="M2.75 19.25c.55-3.25 2.65-5.25 6-5.25s5.45 2 6 5.25" />
    <path d="M16.25 11.25a2.75 2.75 0 100-5.5" />
    <path d="M15.25 14.25c2.9.2 4.85 1.95 5.5 5" />
  </svg>
);

const CompletionIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="8.25" />
    <path d="M8.25 12.25l2.45 2.45 5.1-5.4" />
    <path d="M18.25 5.75l1.5-1.5M5.75 18.25l-1.5 1.5" />
  </svg>
);

const inputClass = 'input-field text-sm';

export default function InstructorDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isInstructor, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [analytics, setAnalytics] = useState({ courses: 0, lessons: 0, students: 0, completions: 0 });
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [toast, setToast] = useState(null);
  const [courseForm, setCourseForm] = useState({ name: '', description: '', thumbnailUrl: '' });
  const [sectionForm, setSectionForm] = useState({ title: '', orderIndex: '' });
  const [lessonForm, setLessonForm] = useState({ sectionId: '', title: '', description: '', videoUrl: '', durationSeconds: '', orderIndex: '' });

  const selectedCourse = useMemo(
    () => subjects.find((subject) => Number(subject.id) === Number(selectedCourseId)),
    [subjects, selectedCourseId]
  );

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.replace('/login?next=/dashboard/instructor');
      return;
    }
    if (!isInstructor) {
      router.replace('/dashboard/student');
    }
  }, [authLoading, isAuthenticated, isInstructor, router]);

  const fetchInstructorData = useCallback(async () => {
    if (!isAuthenticated || !isInstructor) return;
    setLoading(true);
    try {
      const { data } = await subjectsAPI.getInstructorDashboard();
      setSubjects(data.subjects || []);
      setAnalytics(data.analytics || { courses: 0, lessons: 0, students: 0, completions: 0 });
      if (!selectedCourseId && data.subjects?.length) {
        setSelectedCourseId(data.subjects[0].id);
      }
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.error || 'Unable to load instructor dashboard.' });
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, isInstructor, selectedCourseId]);

  useEffect(() => {
    fetchInstructorData();
  }, [fetchInstructorData]);

  const fetchCourseDetails = useCallback(async () => {
    if (!selectedCourseId) {
      setSections([]);
      setStudents([]);
      return;
    }

    try {
      const [sectionsRes, studentsRes] = await Promise.all([
        subjectsAPI.getSections(selectedCourseId),
        subjectsAPI.getStudents(selectedCourseId),
      ]);
      setSections(sectionsRes.data.sections || []);
      setStudents(studentsRes.data.students || []);
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.error || 'Unable to load course details.' });
    }
  }, [selectedCourseId]);

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  useEffect(() => {
    if (selectedCourse) {
      setCourseForm({
        name: selectedCourse.name || '',
        description: selectedCourse.description || '',
        thumbnailUrl: selectedCourse.thumbnail_url || '',
      });
    } else {
      setCourseForm({ name: '', description: '', thumbnailUrl: '' });
    }
  }, [selectedCourse]);

  const handleCourseSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (selectedCourse) {
        await subjectsAPI.update(selectedCourse.id, courseForm);
        setToast({ type: 'success', message: 'Course updated successfully.' });
      } else {
        const { data } = await subjectsAPI.create(courseForm);
        setSelectedCourseId(data.subject?.id);
        setToast({ type: 'success', message: 'Course created successfully.' });
      }
      await fetchInstructorData();
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.error || 'Unable to save course.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCourse = async () => {
    if (!selectedCourse) return;
    if (!window.confirm(`Delete ${selectedCourse.name}? This also removes modules, lessons, and progress.`)) return;

    setSaving(true);
    try {
      await subjectsAPI.remove(selectedCourse.id);
      setSelectedCourseId(null);
      setCourseForm({ name: '', description: '', thumbnailUrl: '' });
      setToast({ type: 'success', message: 'Course deleted.' });
      await fetchInstructorData();
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.error || 'Unable to delete course.' });
    } finally {
      setSaving(false);
    }
  };

  const handleNewCourse = () => {
    setSelectedCourseId(null);
    setSections([]);
    setStudents([]);
    setCourseForm({ name: '', description: '', thumbnailUrl: '' });
  };

  const handleAddSection = async (event) => {
    event.preventDefault();
    if (!selectedCourse) return;
    setSaving(true);
    try {
      await subjectsAPI.createSection(selectedCourse.id, {
        title: sectionForm.title,
        orderIndex: sectionForm.orderIndex ? Number(sectionForm.orderIndex) : undefined,
      });
      setSectionForm({ title: '', orderIndex: '' });
      setToast({ type: 'success', message: 'Module added.' });
      await Promise.all([fetchCourseDetails(), fetchInstructorData()]);
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.error || 'Unable to add module.' });
    } finally {
      setSaving(false);
    }
  };

  const handleAddLesson = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await subjectsAPI.createVideo(lessonForm.sectionId, {
        title: lessonForm.title,
        description: lessonForm.description,
        videoUrl: lessonForm.videoUrl,
        durationSeconds: lessonForm.durationSeconds ? Number(lessonForm.durationSeconds) : 0,
        orderIndex: lessonForm.orderIndex ? Number(lessonForm.orderIndex) : undefined,
      });
      setLessonForm({ sectionId: lessonForm.sectionId, title: '', description: '', videoUrl: '', durationSeconds: '', orderIndex: '' });
      setToast({ type: 'success', message: 'Lesson added.' });
      await Promise.all([fetchCourseDetails(), fetchInstructorData()]);
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.error || 'Unable to add lesson.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLesson = async (videoId) => {
    if (!window.confirm('Delete this lesson?')) return;
    await subjectsAPI.removeVideo(videoId);
    setToast({ type: 'success', message: 'Lesson deleted.' });
    await Promise.all([fetchCourseDetails(), fetchInstructorData()]);
  };

  if (authLoading || loading) {
    return <Layout title="Instructor Dashboard — Learnify"><PageLoader /></Layout>;
  }

  return (
    <Layout title="Instructor Dashboard — Learnify">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="dashboard-shell">
        <div className="dashboard-content">
          <div className="dashboard-hero mb-8">
            <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/[0.65] px-3 py-1 text-xs font-bold uppercase tracking-[0.28em] text-neon-pink shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                  <span className="h-2 w-2 rounded-full bg-neon-pink shadow-[0_0_16px_rgba(255,46,159,0.9)]" />
                  Instructor workspace
                </div>
                <h1 className="max-w-3xl font-display text-4xl font-extrabold tracking-tight text-text-primary dark:text-text-primary-dark sm:text-5xl">
                  Build premium learning experiences, <span className="text-gradient">{user?.name?.split(' ')[0]}</span>.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary dark:text-text-secondary-dark">
                  Create polished course content, manage modules and lessons, and review student momentum from a cinematic RBAC-protected command center.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <button onClick={handleNewCourse} className="btn-primary self-start lg:self-auto">Create Course</button>
                <div className="rounded-2xl border border-white/70 bg-white/[0.55] px-4 py-3 text-sm text-primary-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                  <span className="font-display text-lg font-bold text-primary-900 dark:text-white">{subjects.length}</span> active course studios
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatsCard icon={<CourseIcon />} label="Courses" value={analytics.courses} sub="owned by you" color="brand" />
          <StatsCard icon={<LessonIcon />} label="Lessons" value={analytics.lessons} sub="published videos" color="cta" />
          <StatsCard icon={<StudentsIcon />} label="Students" value={analytics.students} sub="total enrollments" color="accent" />
          <StatsCard icon={<CompletionIcon />} label="Completions" value={analytics.completions} sub="lesson completions" color="brand" />
        </div>

          <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <aside className="space-y-4">
            <div className="premium-panel p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-text-primary dark:text-text-primary-dark">Your Courses</h2>
                <span className="badge bg-neon-violet/10 text-neon-violet">{subjects.length}</span>
              </div>
              <div className="space-y-2">
                {subjects.length === 0 ? (
                  <p className="text-sm text-text-secondary dark:text-text-secondary-dark">Create your first course to get started.</p>
                ) : subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedCourseId(subject.id)}
                    className={`group w-full rounded-2xl border p-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(123,97,255,0.8)] ${Number(selectedCourseId) === Number(subject.id) ? 'border-neon-pink bg-gradient-to-br from-neon-pink/15 to-neon-violet/10 shadow-[0_18px_48px_-32px_rgba(255,46,159,0.9)]' : 'border-white/70 bg-white/[0.45] hover:border-neon-violet/50 dark:border-white/10 dark:bg-white/[0.03]'}`}
                  >
                    <span className="block font-semibold text-text-primary dark:text-text-primary-dark">{subject.name}</span>
                    <span className="mt-1 block text-xs text-text-secondary dark:text-text-secondary-dark">
                      {subject.section_count || 0} modules • {subject.video_count || 0} lessons • {subject.enrollment_count || 0} students
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="premium-panel p-5 sm:p-6">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-display text-2xl font-bold text-text-primary dark:text-text-primary-dark">
                    {selectedCourse ? 'Edit Course' : 'Create Course'}
                  </h2>
                  <p className="text-sm text-text-secondary dark:text-text-secondary-dark">Only you can edit or delete courses you created.</p>
                </div>
                {selectedCourse && (
                  <button onClick={handleDeleteCourse} disabled={saving} className="rounded-full border border-red-500/40 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10 disabled:opacity-50">
                    Delete Course
                  </button>
                )}
              </div>

              <form onSubmit={handleCourseSubmit} className="grid gap-4 lg:grid-cols-2">
                <div>
                  <label className="label">Course title</label>
                  <input className={inputClass} value={courseForm.name} onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })} required />
                </div>
                <div>
                  <label className="label">Thumbnail URL</label>
                  <input className={inputClass} value={courseForm.thumbnailUrl} onChange={(e) => setCourseForm({ ...courseForm, thumbnailUrl: e.target.value })} placeholder="https://..." />
                </div>
                <div className="lg:col-span-2">
                  <label className="label">Description</label>
                  <textarea className={`${inputClass} min-h-[110px]`} value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} />
                </div>
                <div className="lg:col-span-2 flex justify-end">
                  <button disabled={saving} className="btn-primary disabled:opacity-60">{selectedCourse ? 'Save Course' : 'Create Course'}</button>
                </div>
              </form>
            </div>

            {!selectedCourse ? (
              <EmptyState title="Select or create a course" description="Choose a course from the left or use Create Course to start a new instructor-owned course." />
            ) : (
              <>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="premium-panel p-5">
                    <h2 className="font-display text-xl font-bold text-text-primary dark:text-text-primary-dark">Add Module</h2>
                    <form onSubmit={handleAddSection} className="mt-4 space-y-4">
                      <div>
                        <label className="label">Module title</label>
                        <input className={inputClass} value={sectionForm.title} onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })} required />
                      </div>
                      <div>
                        <label className="label">Order</label>
                        <input type="number" className={inputClass} value={sectionForm.orderIndex} onChange={(e) => setSectionForm({ ...sectionForm, orderIndex: e.target.value })} placeholder={`${sections.length + 1}`} />
                      </div>
                      <button disabled={saving} className="btn-secondary w-full disabled:opacity-60">Add Module</button>
                    </form>
                  </div>

                  <div className="premium-panel p-5">
                    <h2 className="font-display text-xl font-bold text-text-primary dark:text-text-primary-dark">Add Lesson / Resource</h2>
                    <form onSubmit={handleAddLesson} className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="label">Module</label>
                        <select className={inputClass} value={lessonForm.sectionId} onChange={(e) => setLessonForm({ ...lessonForm, sectionId: e.target.value })} required>
                          <option value="">Select a module</option>
                          {sections.map((section) => <option key={section.id} value={section.id}>{section.title}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="label">Lesson title</label>
                        <input className={inputClass} value={lessonForm.title} onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })} required />
                      </div>
                      <div>
                        <label className="label">Video/resource URL</label>
                        <input className={inputClass} value={lessonForm.videoUrl} onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })} required />
                      </div>
                      <div>
                        <label className="label">Duration seconds</label>
                        <input type="number" className={inputClass} value={lessonForm.durationSeconds} onChange={(e) => setLessonForm({ ...lessonForm, durationSeconds: e.target.value })} />
                      </div>
                      <div>
                        <label className="label">Order</label>
                        <input type="number" className={inputClass} value={lessonForm.orderIndex} onChange={(e) => setLessonForm({ ...lessonForm, orderIndex: e.target.value })} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="label">Description</label>
                        <textarea className={`${inputClass} min-h-[90px]`} value={lessonForm.description} onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })} />
                      </div>
                      <button disabled={saving || sections.length === 0} className="btn-secondary sm:col-span-2 disabled:opacity-60">Add Lesson</button>
                    </form>
                  </div>
                </div>

                <div className="premium-panel p-5 sm:p-6">
                  <h2 className="font-display text-xl font-bold text-text-primary dark:text-text-primary-dark">Modules & Lessons</h2>
                  <div className="mt-4 space-y-4">
                    {sections.length === 0 ? <EmptyState title="No modules yet" description="Add a module before adding lessons and resources." /> : sections.map((section) => (
                      <div key={section.id} className="rounded-2xl border border-white/70 bg-white/[0.55] p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.035]">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-semibold text-text-primary dark:text-text-primary-dark">{section.order_index}. {section.title}</h3>
                          <span className="text-xs text-text-secondary dark:text-text-secondary-dark">{section.videos?.length || 0} lessons</span>
                        </div>
                        <div className="mt-3 space-y-2">
                          {section.videos?.length ? section.videos.map((video) => (
                            <div key={video.id} className="flex flex-col justify-between gap-2 rounded-xl border border-white/60 bg-white/[0.65] px-3 py-2 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:flex-row sm:items-center">
                              <div>
                                <p className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">{video.order_index}. {video.title}</p>
                                <p className="text-xs text-text-secondary dark:text-text-secondary-dark">{video.duration_seconds || 0}s • {video.video_url}</p>
                              </div>
                              <button onClick={() => handleDeleteLesson(video.id)} className="text-sm font-semibold text-red-400 hover:text-red-300">Delete</button>
                            </div>
                          )) : <p className="text-sm text-text-secondary dark:text-text-secondary-dark">No lessons in this module yet.</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="premium-panel p-5 sm:p-6">
                  <h2 className="font-display text-xl font-bold text-text-primary dark:text-text-primary-dark">Enrolled Students</h2>
                  <div className="mt-4 overflow-hidden rounded-2xl border border-neon-violet/20">
                    {students.length === 0 ? (
                      <p className="p-4 text-sm text-text-secondary dark:text-text-secondary-dark">No students enrolled yet.</p>
                    ) : students.map((student) => {
                      const progress = student.total_videos > 0 ? Math.round((student.completed_videos / student.total_videos) * 100) : 0;
                      return (
                        <div key={student.id} className="grid gap-2 border-b border-neon-violet/10 p-4 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center">
                          <div>
                            <p className="font-semibold text-text-primary dark:text-text-primary-dark">{student.name}</p>
                            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{student.email}</p>
                          </div>
                          <span className="badge bg-neon-pink/10 text-neon-pink">{progress}% complete</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}