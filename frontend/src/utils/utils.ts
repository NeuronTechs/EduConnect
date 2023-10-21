export function getTimeNow(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export function getTimeAndDay(): string {
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  const time = getTimeNow();
  return `Today is ${day}. The time is ${time}.`;
}

export function insertArrayElements<T>(
  arr: T[],
  dragIndex: number,
  hoverIndex: number
): T[] {
  const newLessonList = [...arr];
  const draggedLesson = arr[dragIndex];
  newLessonList.splice(dragIndex, 1); // xóa lesson đang drag khỏi list
  newLessonList.splice(hoverIndex, 0, draggedLesson); // chèn lesson đang drag vào vị trí mới
  return newLessonList;
}
