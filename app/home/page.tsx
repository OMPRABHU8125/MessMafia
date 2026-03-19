import HomeClient from "@/components/HomeClient";
import { MenuItem } from "@/components/HomeClient";

async function getMenuData(): Promise<MenuItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu`, {
      cache: "no-store",
    });

    if (!res.ok) {
        console.error("Failed to fetch menu from backend");
        return [];
    }

    const data = await res.json();
    return data.map((item: any) => ({
        id: item._id,
        name: item.name,
        category: item.category,
        prepTime: item.preparationTime,
        available: item.isAvailable,
        price: item.price,
        image: item.image
    }));
  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
}

export default async function HomePage() {
  const initialMenuData = await getMenuData();
  
  return <HomeClient initialMenuData={initialMenuData} />;
}