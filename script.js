function adjustRadius(inputId, adjustment) {
    const input = document.getElementById(inputId);
    input.value = parseInt(input.value) + adjustment;
}

function generateCommands() {
    const radius = document.getElementById('radius').value;
    const adjustedRadius = document.getElementById('adjustedRadius').value;
    const playerName = document.getElementById('playerName').value.trim();
    const directions = ['X+', 'X-', 'Z+', 'Z-'];
    let commands = '';

    // Comando con el radio principal sin alterar x y z
    let namePart = playerName ? `name="${playerName.replace(/ /g, '" "')}"` : '';
    let mainCommand = `/w @a[x=0,y=64,z=0,r=${radius}${namePart ? ',' + namePart : ''}] Jugador cerca del punto central con radio ${radius}`;
    commands += `<p class="command" onclick="copyCommand(this)">${mainCommand}</p>`;

    // Comandos con el radio ajustable
    directions.forEach(direction => {
        let command = '';
        switch(direction) {
            case 'X+':
                command = `/w @a[x=10000,y=64,z=0,r=${adjustedRadius}${namePart ? ',' + namePart : ''}] Jugador cerca de X=10000`;
                break;
            case 'X-':
                command = `/w @a[x=-10000,y=64,z=0,r=${adjustedRadius}${namePart ? ',' + namePart : ''}] Jugador cerca de X=-10000`;
                break;
            case 'Z+':
                command = `/w @a[x=0,y=64,z=10000,r=${adjustedRadius}${namePart ? ',' + namePart : ''}] Jugador cerca de Z=10000`;
                break;
            case 'Z-':
                command = `/w @a[x=0,y=64,z=-10000,r=${adjustedRadius}${namePart ? ',' + namePart : ''}] Jugador cerca de Z=-10000`;
                break;
        }
        commands += `<p class="command" onclick="copyCommand(this)">${command}</p>`;
    });

    document.getElementById('commandOutput').innerHTML = commands;
}

function copyCommand(element) {
    const command = element.innerText;
    navigator.clipboard.writeText(command).then(() => {
        alert('Comando copiado: ' + command);
    }).catch(err => {
        console.error('Error al copiar el comando: ', err);
    });
}
