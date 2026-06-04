const WORKOUTS = [
  {
    day: "Day 1",
    title: "Upper HIT",
    focus: "Chest, back, delts, arms",
    exercises: [
      "Incline press - 2 x 6-10",
      "Weighted pull-up - 2 x 6-10",
      "Machine row - 2 x 8-12",
      "Lateral raise - 2 x 10-15",
      "Cable curl + pressdown - 2 x 8-12",
    ],
  },
  {
    day: "Day 2",
    title: "Lower Base",
    focus: "Quads, hamstrings, glutes, calves",
    exercises: [
      "Squat or leg press - 2 x 6-10",
      "Romanian deadlift - 2 x 6-10",
      "Leg curl - 2 x 8-12",
      "Standing calf raise - 3 x 10-15",
      "Hanging knee raise - 2 x 10-15",
    ],
  },
  {
    day: "Day 3",
    title: "Full Body",
    focus: "Heavy compounds and weak points",
    exercises: [
      "Deadlift - 1 x 5",
      "Flat dumbbell press - 2 x 8-10",
      "Lat pulldown - 2 x 8-12",
      "Bulgarian split squat - 2 x 8-10",
      "Rear delt fly - 2 x 12-15",
    ],
  },
];

export default function WorkoutsPage() {
  return (
    <main className="page-main">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Less is more</p>
          <h1>HIT workout plan</h1>
          <p className="page-sub">Three focused sessions built around intensity, recovery, and progressive overload.</p>
        </div>
        <div className="hero-stat">
          <span>3</span>
          <small>days / week</small>
        </div>
      </section>

      <section className="workout-grid">
        {WORKOUTS.map((workout) => (
          <article className="workout-card" key={workout.day}>
            <div className="card-topline">
              <span>{workout.day}</span>
              <span className="material-symbols-outlined">fitness_center</span>
            </div>
            <h2>{workout.title}</h2>
            <p>{workout.focus}</p>
            <ul>
              {workout.exercises.map((exercise) => (
                <li key={exercise}>{exercise}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="method-panel">
        <div>
          <p className="eyebrow">Progression model</p>
          <h2>Beat the logbook</h2>
        </div>
        <div className="method-steps">
          <div><strong>1</strong><span>Train close to failure with clean form.</span></div>
          <div><strong>2</strong><span>Add reps until the top range is hit.</span></div>
          <div><strong>3</strong><span>Add weight, reset reps, repeat.</span></div>
        </div>
      </section>
    </main>
  );
}
