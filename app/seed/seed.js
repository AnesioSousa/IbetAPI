const { faker } = require("@faker-js/faker/locale/pt_BR");
const Apostador = require("../models/apostador.js");

init(2);

function init(number){
  const users = [];
  Array.from({ length: number }).forEach(() => {
    users.push(createRandomPerson());
  });
  console.log(users);
}



function createRandomPerson(){
	return {
	  name: faker.name.fullName(),
      phone: faker.phone.number('##9########'),
	  email: faker.internet.email(),
      birthdate: faker.date.birthdate(),
	  username: faker.internet.userName(),
	  password: faker.internet.password(16),
      cpf: faker.phone.number('###########')
	};
}

function createRandomAddress(){
  return {
    postalcode: faker.address.countryCode(),
    logradouro: faker.address.street(),
    numero: faker.address.buildingNumber(),
  }
}