const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrect = dogsJulia.slice();
  dogsJuliaCorrect.splice(0, 1);
  dogsJuliaCorrect.splice(-2);
  console.log(dogsJuliaCorrect);
  const dogs = dogsJuliaCorrect.concat(dogsKate);
  console.log(dogs);
  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(
        `Dog number ${i + 1} is an adult, and the dog is ${dog} years old.`
      );
    } else {
      console.log(
        `Dog number ${i + 1} is an puppy, and the puppy is ${dog} years old.`
      );
    }
  });
  return dogs;
};
// const dogs = checkDogs([2, 4, 3, 6, 4, 5, 3], [2, 5, 7, 4, 3, 5, 2]);
// // const user = 'Sunita Thomas Williams ';
// // const userName = user
// //   .toLowerCase()
// //   .split(' ')
// //   .map(name => name[0])
// //   .join('');
// // console.log(userName);
// ///Convert ages of dog to human ages

// const calcHumanAge = function (ages) {
//   const humanAge = [];
//   const adultHumanAge = [];
//   ages.forEach(function (dog, i) {
//     const age = dog <= 2 ? 2 * dog : 16 + dog * 4;
//     humanAge.push(age);
//     if (age >= 18) {
//       adultHumanAge.push(age);
//     }
//   });
//   const sum = adultHumanAge.reduce((sum, i) => sum + i);
//   const avg = sum / adultHumanAge.length;
//   console.log(humanAge);
//   console.log(adultHumanAge);
//   console.log(avg);
// };
// calcHumanAge(dogs);
// const humanAge = [];
// const adultHumanAge = [];
// const calcHumanAge2 = ages =>
//   ages
//     .map(ages => (ages <= 2 ? ages * 2 : 16 + ages * 4))
//     .filter(ages => ages >= 18)
//     .reduce((sum, i, arr) => sum + i / arr.length, 0);
// const avg = calcHumanAge2(dogs);
// console.log(avg);

// const breeds = [
//   {
//     breed: 'German Shepherd',
//     averageWeight: 32,
//     activities: ['fetch', 'swimming'],
//   },
//   {
//     breed: 'Dalmatian',
//     averageWeight: 24,
//     activities: ['running', 'fetch', 'agility'],
//   },
//   {
//     breed: 'Labrador',
//     averageWeight: 28,
//     activities: ['swimming', 'fetch'],
//   },
//   {
//     breed: 'Beagle',
//     averageWeight: 12,
//     activities: ['digging', 'fetch'],
//   },
//   {
//     breed: 'Husky',
//     averageWeight: 26,
//     activities: [
//       'running',
//       'agility',
//       // , 'swimming'
//     ],
//   },
//   {
//     breed: 'Bulldog',
//     averageWeight: 36,
//     activities: ['sleeping'],
//   },
//   {
//     breed: 'Poodle',
//     averageWeight: 18,
//     activities: ['agility', 'fetch'],
//   },
// ];
// const huskyWeight = breeds.find(breed => breed.breed == 'Husky').averageWeight;
// console.log(huskyWeight);

// const dogBothActivities = breeds.find(
//   breed =>
//     breed.activities.includes('fetch') && breed.activities.includes('running')
// );
// console.log(dogBothActivities);

// //const allActivities = breeds.map(breed => breed.activities).flat();
// const allActivities = breeds.flatMap(breed => breed.activities);
// console.log(allActivities);

// const uniqueActivities = [...new Set(allActivities)];
// console.log(uniqueActivities);

// const swimmingAdjacent = [
//   ...new Set(
//     breeds
//       .filter(breed => breed.activities.includes('swimming'))
//       .flatMap(breed => breed.activities)
//       .filter(activity => activity !== 'swimming')
//   ),
// ];
// console.log(swimmingAdjacent);

// console.log(breeds.every(breed => breed.averageWeight >= 10));

// console.log(breeds.some(breed => breed.activities.length >= 3));

// const bonuss = breeds
//   .filter(breed => breed.activities.includes('fetch'))
//   .map(breed => breed.averageWeight);
// const bonus = Math.max(...bonuss);
// console.log(bonus);

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(function (dog, i) {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
  console.log(dog);
});

const dogSarah = dogs.find(dogs => dogs.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recommendedFood ? 'much' : 'little'
  }`
);

const ownersTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .map(dogs => dogs.owners)
  .flat();
console.log(...ownersTooMuch);

console.log(
  dogs.every(
    dog =>
      dog.curFood > dog.recommendedFood * 0.9 ||
      dog.curFood < dog.recommendedFood * 1.1
  )
);

console.log(
  ...dogs.filter(
    dog =>
      dog.curFood > dog.recommendedFood * 0.9 ||
      dog.curFood < dog.recommendedFood * 1.1
  )
);

const dogsSorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
