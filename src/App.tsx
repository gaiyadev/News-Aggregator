import NewsAndPreferences from "./features/NewsAndPreferences";

function App() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* <h1 className="p-4 text-center text-xl font-bold bg-white shadow ">
        News Aggregator
      </h1> */}
      <div className="max-w-6xl mx-auto p-4">
        <NewsAndPreferences />
      </div>
    </main>
  );
}

export default App;
