const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Aardrijkskunde" },
        { name: "Wiskunde" },
        { name: "Nederlands" },
        { name: "Duits" },
        { name: "Engels" },
        { name: "Frans" },
        { name: "Natuurkunde" },
        { name: "Scheikunde" },
        { name: "Economie" },
        { name: "Bedrijfseconomie" },
        { name: "Geschiedenis" },
        { name: "Biologie" },
      ]
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();