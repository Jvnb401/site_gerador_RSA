const primeNumbers = document.getElementById("primeNumbers");
const test = document.getElementById('messagen');
let c = 0;
let n = 0;
let d = 0;
let arrNum = [];

const IsItPrime = (n) => {
    if (n % 2 == 0 && n != 2) {
        return "";
    }
    for (let j = 3; j <= Math.sqrt(n); j += 2) {
        if (n % j == 0) {
            return "";
        }
    }
    return n;
}

function PrintPrime(x) {
    const prime = IsItPrime(x);
    if (prime != null) {
        primeNumbers.innerHTML += `
                <option>${prime}</option>
            `;
    }
}

function MDC(a, b) {
    while (b != 0) {
        const r = a % b;
        a = b;
        b = r;
    }
    return a;
}

for (let i = 3; i < 1000; i += 2) {
    PrintPrime(i);
}

function Start() {
    alert("numeros grandes podem demorar para fazer as operações necessarias");

    let p = IsItPrime(document.getElementById("p").value);
    if (p == "") {
        alert("digite um numero primo no p");
        return
    }

    let q = IsItPrime(document.getElementById("q").value);
    if (q == "") {
        alert("digite um numero primo no q");
        return
    }

    n = p * q;
    let phiN = (p - 1) * (q - 1);
    document.getElementById("n").value = n;
    document.getElementById("n").classList.add('actived');
    document.getElementById("phiN").value = phiN;
    document.getElementById("phiN").classList.add('actived');

    c = document.getElementById("c").value;
    if (!(1 < c && c < phiN && MDC(phiN, c) == 1)) {
        alert(`a chave publica deve atender aos requisitos:
        mdc(φ(n), c) = 1 e 1 < C < φ(n)
        obs: no caso φ(n) é ${phiN}`);
        return
    }

    d = 0;
    while (((d * c) % phiN != 1) || (d == c)) { d++ }
    document.getElementById('d').value = d;
    document.getElementById("d").classList.add('actived');


    test.classList.remove('hide');

    c = BigInt(c);
    d = BigInt(d);
    n = BigInt(n);
}

function decipher() {
    let stringASC = "";
    let arrASC = [];

    let lengthOfBlocks = parseInt(document.getElementById("length").value);

    let raw = document.getElementById("rawData");
    let encrypted = document.getElementById("encryptedData").value;
    document.getElementById("encryptedData").value = "";
    encrypted = encrypted.split(`\n`);
    raw.value = "";

    try {
        const jump = n == 10 ? 1 : n.toString().length;
        let index = 0;
        while (index < encrypted.length) {
            for (let i = 0; i < encrypted[index].length; i += jump) {
                let num = encrypted[index][i];
                for (let j = 1; j < jump; j++) { num += encrypted[index][i + j] }
                num = BigInt(parseInt(num))
                console.log(num)
                if (num < n) {
                    document.getElementById("encryptedData").value += `${num}\n`;
                    arrNum.push(num);
                } else {
                    alert(`coloque numeros menores que ${n}`);
                }
            }
            index += 1;
        }
    } catch (error) {
        alert("deu erro, verifique se utilizou apenas numeros");
    }

    arrNum.forEach((x, i) => {
        try {
            x = (x ** d) % n;
            x = x.toString();
            while (x.length < lengthOfBlocks) {
                x = '0' + x;
            }

            arrNum[i] = x;
        } catch (error) {
            alert(`infelizmente o numero ${x} ao ser elevado a ${d} dá um numero acima do limite suportado pelo programa assim não podendo completar a formula:\n
                (${x}^(${d}))mod${n}`)
        }
    });

    stringASC = (arrNum.join()).replace(/,/g, "");

    for (let i = 0; i < stringASC.length; i += 3) {
        arrASC[i / 3] = stringASC[i] + stringASC[i + 1] + stringASC[i + 2]
    }

    arrASC.map((x) => {
        x -= 100;
        console.log(x)
        raw.value += String.fromCharCode(x);
    })

    console.log(arrASC);
    console.log(stringASC)

    arrNum.splice(0, arrNum.length);
}

function encrypt() {
    let raw = document.getElementById("rawData").value;
    let encrypted = document.getElementById("encryptedData");
    document.getElementById("rawData").value = "";
    //raw = raw.split(`\n`);
    encrypted.value = "";


    let number = "";
    let testN = "";

    for (let j = 0; j < raw.length; j++) {
        for (let i = 0; i < raw[j].length; i++) {
            testN = (raw[j][i].charCodeAt() + 100).toString();

            number += testN;
        }
        //number += `\n`;
    }


    raw = number.split(`\n`);
    console.log(raw)

    try {
        const jump = n == 10 ? 1 : n.toString().length - 1;
        document.getElementById("length").value = jump;
        if ((jump + 1 % 3) == 0) {
            alert("os caracteres serão comvertidos para ascII e somados 100");
        }
        let index = 0;
        while (index < raw.length) {
            for (let i = 0; i < raw[index].length; i += jump) {
                let end = i + jump;
                let num = raw[index].slice(i, end);
                console.log(num)
                num = BigInt(parseInt(num))
                if (num < n) {
                    if (num < 356 && num > 99) {
                        document.getElementById("rawData").value += String.fromCharCode(parseInt(num) - 100);
                    } else {
                        document.getElementById("rawData").value += `${num}\n`;
                    }

                    arrNum.push(num);
                } else {
                    alert(`coloque numeros menores que ${n}`);
                }
            }
            index++
        }
    } catch (e) {
        console.log(e);
    }

    arrNum.map((x) => {
        try {
            x = (x ** c) % n;
            encrypted.value += `${x}\n`;
        } catch (e) {
            alert(`infelizmente o numero ${x} ao ser elevado a ${c} dá um numero acima do limite suportado pelo programa assim não podendo completar a formula:\n (${x}^(${c}))mod${n}`);
        }
    });

    arrNum.splice(0, arrNum.length);
}
