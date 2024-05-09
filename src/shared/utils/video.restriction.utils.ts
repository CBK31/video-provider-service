export async function isAgeRestricted(ageRestriction, userAge) {
  const restrictionMap = {
    U: 0,
    PG7: 7,
    PG10: 10,
    PG13: 13,
    PG16: 16,
    PG18: 18,
  };

  // If the restriction is not recognized, allow by default (return true)
  const requiredAge = restrictionMap[ageRestriction];
  if (requiredAge === undefined) {
    throw new Error(`Invalid age restriction: ${ageRestriction}`);
  }

  // Return true if the user's age meets or exceeds the required age (not restricted)
  return userAge <= requiredAge;

  //   return age;
}
