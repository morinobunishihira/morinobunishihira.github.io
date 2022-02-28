'strict'
{
    const resolts = ["大吉","中吉","末吉","凶",]
    const btn = document.getElementById('btn');

    btn.addEventListener('click', () => {
        btn.textContent = resolts[Math.floor(Math.random() * resolts.length)];
        console.log(resolts[Math.floor(Math.random() * resolts.length)]);
    })
}