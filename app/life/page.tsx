import { getLifeEvents } from "@/app/api";
import LifeContent from "@/app/life/component";

export default async function Life() {
  const lifeEventsData = await getLifeEvents();
  return <LifeContent lifeEventsData={lifeEventsData} />;
}
