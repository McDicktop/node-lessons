require('dotenv').config();
const os = require('os');
const chalk = require('chalk');

// console.log(process.env.URL)
// console.log(process.env.HOST)
// console.log(process.env.PORT)


// console.log('Error: Invalid id note')
// console.log('Error: Invalid form data')

// console.log(chalk.red.bold.italic('Text'))
// console.log(chalk.bold.red.italic('Text'))
// console.log(chalk.red('Text'))
// console.log(chalk.yellow.bgBlue('Text'))

// console.log(chalk.green(
//     `
//         Green line
//         ${chalk.red('Red line')}
//         ${chalk.yellow('Yellow line')}
//         ${chalk.reset.bold('Text')}
//     `
// ))

// console.log(chalk.rgb(10, 125, 0).bold('Text'));



// const redCMD = chalk.bold.red.italic;
// console.log(redCMD('Text'))




// 1. Использовать модуль os для выввода всей информации по ПК
//(название Проца, общая память, свободная память, занятая памать и тд).$
// 2. Сделать человекочитаемый вывод с окрашиванием и выделением теста в консоли
//(например проце занят на 70% - красный, иначе зеленый или желтый)
// 3. Вынести некоторые системные параметры в env, например Название видеокарты и ее год выпуска и 
// так же вывести и визуально обрабоать.



function getMemoryInfo(total, free){

    const bt_gb = (1024 * 1024 * 1000)

    return {
        total: +(total / bt_gb).toFixed(2),
        free: +(free / bt_gb).toFixed(2),
        used: +((total - free) / bt_gb).toFixed(2)
    }
}

function getCPUInfo(){
    const cpu = os.cpus()

    return {
        model: cpu[0].model.slice(0, cpu[0].model.indexOf('CPU') - 1),
        cores: cpu.length,
        thread: cpu.length,
        speed: (cpu[0].speed / 1000).toFixed(1) + ' GHz',
        arch: os.arch(),
    }
}

function osInfo(){
    return {
        ver: os.version(),
        release: os.release(),
    }
}

function networkInfo(){
    let ipv4,
        mac;
    for (key in os.networkInterfaces()){
        if (os.networkInterfaces()[key][0].internal === false){
            ipv4 = os.networkInterfaces()[key].filter(el => el.family === 'IPv4')[0].address;
            mac = os.networkInterfaces()[key].filter(el => el.family === 'IPv4')[0].mac;
        }
    }
    return {
        ipv4,
        mac
    }
}

function userInfo(){
    return {
        hostname: os.hostname(),
        homedir: os.homedir()
    }
}

function videoInfo(){
    return {
        videoModel: process.env.VIDEOADAPTER,
        videoMem: process.env.VIDEOMEMORY,
        videoType: process.env.VIDEOMEMORYTYPE
    }
}

function soundController() {
    return {
        soundModel: process.env.SOUNDCONTROLLER
    }
}

const systemInfo = {
    cpu: getCPUInfo(),
    mem: getMemoryInfo(os.totalmem(), os.freemem()),
    os: osInfo(),
    network: networkInfo(),
    user: userInfo(),
    video: videoInfo(),
    sound: soundController()
}

const keysDescription = {
    cpu: 'CPU info',
    model: 'CPU model',
    cores: 'Numbers of cores',
    thread: 'Numbers of threads',
    speed: 'Clock frequency',
    arch: 'CPU architecture',
    mem: 'Memory info',
    total: 'Total memory*',
    free: 'Free memory*',
    used: 'Used memory*',
    os: 'Operating system info',
    ver: 'OS edition',
    release: 'OS build',
    network: 'Network info',
    ipv4: 'IP address',
    mac: 'MAC address',
    user: 'User info',
    hostname: 'Device name',
    homedir: 'User name',
    video: 'Display adapter',
    videoModel: 'Model',
    videoMem: 'Memory size*',
    videoType: 'Memory type',
    sound: 'Sound controller',
    soundModel: 'Model',
} 

function consoleView(systemInfoArg){
    let prefix = ' Gb';
    for (let key in systemInfoArg){
        console.log(chalk.blue.bold(keysDescription[key]))
        for (let item in systemInfoArg[key]){
            let output = `> ${chalk.green(keysDescription[item] + ':')} ${systemInfoArg[key][item]}`;
            if (keysDescription[item].includes('*')){
                output += prefix;
                output = output.replace('*', '');
            }
            console.log(output);
        }
        console.log('');
    }
}

consoleView(systemInfo);