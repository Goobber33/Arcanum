export const attack = ({attacker, reciver})=> {
    const recivedDamage =
    attacker.attack - (attacker.level - reciver.level)

const finalDamage = recivedDamage - reciver.defense / 2

return finalDamage;
};

export const heal = ({reciver}) => {
    return reciver.healing
};