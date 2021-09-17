const { Command } = require('commander')
const { resolve } = require('path')
const gorevliler = require(resolve(process.cwd(), 'bin', 'gorevliler.js'))
const { readFileSync } = require('fs')


const program = new Command(); 

const log = console.log

program.option('-t, --tumu_dagit', 'Göreveleri round-robin algoritmasıyla dağıtır')
program.option('-a, --ada_gore_dagit', 'adınıza göre düşen görevleri gösterir')
program.option('-i, --indexe_gore_dagit', "index'inize düşen görevleri gösterir")
.parse(process.argv)


const options = program.opts();
// round robin

const gorevDagit = () => {
    let i = 0;
    const gorevliSayisi = gorevliler.length
    const sinavlar = JSON.parse(readFileSync( resolve(process.cwd(), 'bin', 'sinav.json'), 'utf8'))
    return sinavlar.map( sinav => {
            
        if( i == gorevliSayisi ) i = 0;
        const data =  {
            gorevli : gorevliler[i],
            sinav
        }
        i++
        return data
    })
}


switch ( Object.keys(options)[0]) {
        case "tumu_dagit": 
        log( gorevDagit())

        break;
        case "ada_gore_dagit":
          
            const isime_cikti = Array.from(gorevDagit()).filter(gorev => {
               
               return gorev.gorevli == program.args[0]
               //return gorev.gorevli == gorevliler[Number(program.args)]
             
            })
            
            log(isime_cikti)
        break;


        case "indexe_gore_dagit":
          
            const indexe_cikti = Array.from(gorevDagit()).filter(gorev => {
             
                return gorev.gorevli == gorevliler[Number(program.args)]
            })
            
            log(indexe_cikti)
        break;

    default:
        log()
        log()
        log("Herhangi bir komut girilmedi, komut listesi için -h")
        log('Görevler round robin algoritması ile dağıtılmıştır')
        log()
        log('Tüm görev listesini görmek için -t yazınız')
        log()
        log( `görevli listesi`, gorevliler.map( (g, i) => { return { isim: g, index: i}}))
        log('Sadece kendi görevinizi görmek için -a "adınız" veya -i index numaranız şeklinde yazınız')
        break;
}

