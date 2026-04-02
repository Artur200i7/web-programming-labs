// Завдання 1: Деструктуризація та Spread/Rest 

// 1.1. Функція формує повне ім'я з ініціалами
export function getFullName(user) {
  const { firstName, lastName, middleName = "" } = user;

  // Беремо першу літеру імені
  const firstInitial = firstName[0] + ".";

  // Якщо по батькові є — додаємо ініціал
  const middleInitial = middleName ? " " + middleName[0] + "." : "";

  return `${lastName} ${firstInitial}${middleInitial}`;
}

// 1.2. Об'єднання довільної кількості об'єктів
// Використовуємо rest (...objects) та spread (...obj)
export function mergeObjects(...objects) {
  return objects.reduce((acc, obj) => ({ ...acc, ...obj }), {});
}

// 1.3. Об'єднання масивів та видалення дублікатів
// Використовуємо Set та spread
export function removeDuplicates(...arrays) {
  const merged = arrays.flat(); // об'єднуємо всі масиви
  return [...new Set(merged)]; // Set автоматично прибирає дублікати
}

// 1.4. Оновлення користувача без мутації
// Якщо є вкладений address — об'єднуємо його окремо
export function createUpdatedUser(user, updates) {
  return {
    ...user,
    ...updates,
    address: {
      ...user.address,
      ...updates.address,
    },
  };
}

// Вивід результатів у консоль 
console.log("=== Завдання 1: Деструктуризація та Spread/Rest ===");

// 1.1
console.log(
  "1.1:",
  getFullName({
    firstName: "Петро",
    lastName: "Іванов",
    middleName: "Сергійович",
  })
);

console.log(
  "1.1 (без по батькові):",
  getFullName({ firstName: "Анна", lastName: "Коваль" })
);

// 1.2
console.log("1.2:", mergeObjects({ a: 1 }, { b: 2 }, { a: 3, c: 4 }));

// 1.3
console.log(
  "1.3:",
  removeDuplicates([1, 2, 3], [2, 3, 4], [4, 5])
);

// 1.4
const user = {
  name: "John",
  age: 25,
  address: { city: "Kyiv", zip: "01001" },
};

const updated = createUpdatedUser(user, {
  age: 26,
  address: { zip: "02002" },
});

console.log("1.4: updated =", updated);
console.log("1.4: original user =", user);
