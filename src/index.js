const player1 = {
    NOME:"Mario",
    VELOCIDADE:4,
    MANOBRABILIDADE:3,
    PODER:3,
    PONTOS:0,
}

const player2 = {
    NOME:"Peach",
    VELOCIDADE:3,
    MANOBRABILIDADE:4,
    PODER:2,
    PONTOS:0,
}

const player3 = {
    NOME:"Yoshi",
    VELOCIDADE:2,
    MANOBRABILIDADE:4,
    PODER:3,
    PONTOS:0,
}

const player4 = {
    NOME:"Bowser",
    VELOCIDADE:5,
    MANOBRABILIDADE:2,
    PODER:5,
    PONTOS:0,
}

const player5 = {
    NOME:"Luigi",
    VELOCIDADE:3,
    MANOBRABILIDADE:4,
    PODER:4,
    PONTOS:0,
}

const player6 = {
    NOME:"Donkey Kong",
    VELOCIDADE:2,
    MANOBRABILIDADE:2,
    PODER:5,
    PONTOS:0,
}

function rollDice(){
    return Math.floor(Math.random()*6)+1
}

async function getRandomBlock(){
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = 'RETA'
            break;
        case random < 0.66:
            result = 'CURVA'
            break;
        default:
            result = 'CONFRONTO'
    }
    
    return result
}

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} rolou um dado de ${block} - ${diceResult} + ${attribute} = ${diceResult+attribute}`)
}

async function playRaceEngine(character1, character2){
    console.log(
        `++++++++++++++++++++++++++++++++++++++++++++++\nCorrida entre ${character1.NOME} e ${character2.NOME} começando...\n+++++++++++++++++++++++++++++++++++++++++++++++` 
    )
    for (let round=1;round <= 6; round++){
        console.log(`Rodada ${round}`)
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)
        

        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block == 'RETA'){
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(
                character1.NOME,
                "VELOCIDADE",
                diceResult1,
                character1.VELOCIDADE
            )

            await logRollResult(
                character2.NOME,
                "VELOCIDADE",
                diceResult2,
                character2.VELOCIDADE
            )
        }
        if (block == 'CURVA'){
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(
                character1.NOME,
                "MANOBRABILIDADE",
                diceResult1,
                character1.MANOBRABILIDADE
            )

            await logRollResult(
                character2.NOME,
                "MANOBRABILIDADE",
                diceResult2,
                character2.MANOBRABILIDADE
            )
        }
        if (block == 'CONFRONTO'){
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;
            let tipos = ['casco','bomba']
            let tipoDaRodada = (Math.random()>0.5) ? tipos[0] : tipos[1]


            await logRollResult(
                character1.NOME,
                "PODER",
                diceResult1,
                character1.PODER
            )

            await logRollResult(
                character2.NOME,
                "PODER",
                diceResult2,
                character2.PODER
            )

            // character2.PONTOS -= powerResult1 < powerResult2 && character2.PONTOS>0 ? 1 : 0
            // character1.PONTOS -= powerResult1 < powerResult2 && character1.PONTOS>0 ? 1 : 0
            
            if(powerResult1 < powerResult2) {
                console.log(`${character2.NOME} venceu o confronto!`)
                if (Math.random()<0.5){
                    console.log(`Nessa rodada ${character2.NOME} ganha 1 ponto.`)
                    character2.PONTOS++
                } else {
                    console.log(`Nessa rodada ${character2.NOME} nao ganha nenhum ponto.`)
                }
                if(character1.PONTOS>0){
                    if (tipoDaRodada == 'casco'){
                        character1.PONTOS--
                        console.log(`${character1.NOME} levou um casco e perde um ponto!`)
                    } else if (tipoDaRodada == 'bomba' && character1.PONTOS>1){
                        character1.PONTOS -= 2
                        console.log(`${character1.NOME} levou uma bomba e perde dois pontos!`)
                    }
                } else {
                    console.log(`${character1.NOME} não perdeu nenhum ponto.`)
                }
            } else if(powerResult1 > powerResult2){
                console.log(`${character1.NOME} venceu o confronto!`)
                if (Math.random()<0.5){
                    console.log(`Nessa rodada ${character1.NOME} ganha 1 ponto.`)
                    character1.PONTOS++
                } else {
                    console.log(`Nessa rodada ${character1.NOME} nao ganha nenhum ponto.`)
                }
                if(character2.PONTOS>0){
                    if (tipoDaRodada == 'casco'){
                        character2.PONTOS--
                        console.log(`${character2.NOME} levou um casco e perde um ponto!`)
                    } else if (tipoDaRodada == 'bomba' && character2.PONTOS>1){
                        character2.PONTOS -= 2
                        console.log(`${character2.NOME} levou uma bomba e perde dois pontos!`)
                    }
                } else {
                    console.log(`${character2.NOME} não perdeu nenhum ponto.`)
                }
            } else {
                console.log(`Ninguem venceu o confronto!`)
            } 
        }

        if(totalTestSkill1 < totalTestSkill2) {
            console.log(`${character2.NOME} marcou um ponto!`)
            character2.PONTOS++
        } else if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto!`)
            character1.PONTOS++
        } else if (block != 'CONFRONTO') {
            console.log(`Ninguem marcou um ponto!`)
        } 
        console.log(`${character1.NOME} - PONTOS = ${character1.PONTOS}\n${character2.NOME} - PONTOS = ${character2.PONTOS}`)
        console.log('------------------------------------------')
    }
}

async function declareWinner(character1,character2){
    console.log("################################################")
    if (character1.PONTOS > character2.PONTOS){
        console.log(`O grade vencedor da corrida foi ${character1.NOME}!`)
    } else if (character1.PONTOS < character2.PONTOS){
        console.log(`O grade vencedor da corrida foi ${character2.NOME}!`)
    } else {
        console.log(`A corrida entre ${character1.NOME} e ${character2.NOME} acabou empatada!`)
    }
    console.log("################################################")

}

(async function main(){
    await playRaceEngine(player2, player5)
    await declareWinner(player2, player5)
})()