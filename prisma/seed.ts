import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seeding jobsheet data
  const jobsheets = await Promise.all(
    Array.from({ length: 20 }).map(() =>
      prisma.jobsheet.create({
        data: {
          madeBy: 'Technician ' + Math.floor(Math.random() * 100),
          email: 'technician' + Math.floor(Math.random() * 100) + '@example.com',
          address: 'Address ' + Math.floor(Math.random() * 100),
          circle: 'Circle ' + Math.floor(Math.random() * 10),
          division: 'Division ' + Math.floor(Math.random() * 5),
          product: 'Product ' + Math.floor(Math.random() * 5),
          serial: Math.floor(Math.random() * 1000),
          modelno: Math.floor(Math.random() * 100),
          earthing: 'Yes',
          stabilizer: 'Yes',
          IPVoltage: Math.floor(Math.random() * 200),
          OPVoltage: Math.floor(Math.random() * 200),
          grillTemperature: Math.floor(Math.random() * 100),
          roomTemperature: Math.floor(Math.random() * 100),
          ambientTemperature: Math.floor(Math.random() * 100),
          technicianName: 'Technician ' + Math.floor(Math.random() * 10),
          visitDate: new Date(),
          faultFound: 'Fault ' + Math.floor(Math.random() * 5),
          actionTaken: ['Action ' + Math.floor(Math.random() * 5)],
          extraMaterial: 'Material ' + Math.floor(Math.random() * 10),
          copperPipe: Math.floor(Math.random() * 10),
          drainPipe: Math.floor(Math.random() * 10),
          wire: Math.floor(Math.random() * 10),
          ODUStand: Math.floor(Math.random() * 10),
          PinPlug: Math.floor(Math.random() * 10),
          airFilter: Math.floor(Math.random() * 10),
          technicianComments: 'Comments ' + Math.floor(Math.random() * 5),
          newSparepartConsumed: 'Sparepart ' + Math.floor(Math.random() * 5),
          PartReplacementDetail: ['Part ' + Math.floor(Math.random() * 5)],
          totalAmount: Math.floor(Math.random() * 1000),
        },
      })
    )
  );

  // Seeding complain data
  const complains = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.complains.create({
        data: {
          name: 'Customer ' + Math.floor(Math.random() * 100),
          email: 'customer' + Math.floor(Math.random() * 100) + '@example.com',
          complainId: 'C' + Math.floor(Math.random() * 1000),
          city: 'City ' + Math.floor(Math.random() * 10),
          description: 'Complaint description ' + Math.floor(Math.random() * 5),
          status: 'New',
          jobSheetId: jobsheets[Math.floor(Math.random() * jobsheets.length)].id,
        },
      })
    )
  );

  // Seeding userform data
  const userforms = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.userform.create({
        data: {
          informationDate: new Date(),
          location: 'Location ' + Math.floor(Math.random() * 100),
          email: 'user' + Math.floor(Math.random() * 100) + '@example.com',
          machineInstalled: 'Machine ' + Math.floor(Math.random() * 5),
          make: 'Make ' + Math.floor(Math.random() * 5),
          type: 'Type ' + Math.floor(Math.random() * 5),
          tonnage: 'Tonnage ' + Math.floor(Math.random() * 10),
          serial: Math.floor(Math.random() * 1000),
          priority: 'High',
          problem: 'Problem ' + Math.floor(Math.random() * 5),
          call: 'Not closed',
        },
      })
    )
  );

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
