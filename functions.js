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
    document.getElementById("modN").value = n;
    document.getElementById("modN").classList.add('actived');
    document.getElementById("n").value = phiN;
    document.getElementById("n").classList.add('actived');

    c = document.getElementById("c").value;
    if (!(1 < c && c < phiN && MDC(phiN, c) == 1)) {
        alert(`a chave publica deve atender aos requisitos:
        mdc(φ(n), c) = 1 e 1 < C < φ(n)
        obs: no caso φ(n) é ${phiN}`);
        return
    }

    d = 0;
    while ((d * c) % phiN != 1) { d++ }
    document.getElementById('d').value = d;
    document.getElementById("d").classList.add('actived');


    test.classList.remove('hide');

    c = BigInt(c);
    d = BigInt(d);
    n = BigInt(n);
}

function decipher() {
    let raw = document.getElementById("rawData");
    let encrypted = document.getElementById("encryptedData").value;
    document.getElementById("encryptedData").value = "";
    encrypted = encrypted.replace(/\s/, "").split(`\n`);
    raw.value = "";

    try {
        const jump = n == 10 ? 1 : n.toString().length;
        let index = 0;
        while (index < encrypted.length) {
            for (let i = 0; i < encrypted[index].length; i += jump) {
                let num = encrypted[index][i];
                for (let j = 1; j < jump; j++) { num += encrypted[index][i + j] }
                num = BigInt(parseInt(num))
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

    console.log("teste");

    arrNum.map((x) => {
        x = (x ** d) % n;
        raw.value += `${x}\n`;
    });

    arrNum.splice(0, arrNum.length);
}

function encrypt() {
    let raw = document.getElementById("rawData").value;
    let encrypted = document.getElementById("encryptedData");
    document.getElementById("rawData").value = "";
    raw = raw.replace(/\s/, "").split(`\n`);
    encrypted.value = "";

    try {
        const jump = n == 10 ? 1 : n.toString().length;
        let index = 0;
        while (index < raw.length) {
            for (let i = 0; i < raw[index].length; i += jump) {
                let num = raw[index][i];
                for (let j = 1; j < jump; j++) { num += raw[index][i + j] }
                num = BigInt(parseInt(num))
                if (num < n) {
                    document.getElementById("rawData").value += `${num}\n`;
                    arrNum.push(num);
                } else {
                    alert(`coloque numeros menores que ${n}`);
                }
            }
            index++
        }
    } catch (e) {
        alert("deu erro, verifique se utilizou apenas numeros");
    }

    arrNum.map((x) => {
        x = (x ** c) % n;
        encrypted.value += `${x}\n`;
    });

    arrNum.splice(0, arrNum.length);
}