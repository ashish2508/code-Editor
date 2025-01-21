import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OuterPanel from "./_components/OuterPanel";

export default function Home() {
  return (
    <div className="min-h-screen">

<div className="max-w-[1800px] mx-auto p-4">
<Header />
   <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 ">
<EditorPanel />
<OuterPanel />
   </div>
</div>
    </div>
  );
}
//Add a sign-in page (hero) bare minimum kr le
