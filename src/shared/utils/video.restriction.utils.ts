export async function isAgeRestricted(ageRestriction, userAge) {
  const restrictionMap = {
    U: 0,
    PG7: 7,
    PG10: 10,
    PG13: 13,
    PG16: 16,
    PG18: 18,
  };

  const requiredAge = restrictionMap[ageRestriction];
  if (requiredAge === undefined) {
    throw new Error(`Invalid age restriction: ${ageRestriction}`);
  }

  return userAge <= requiredAge;
}
