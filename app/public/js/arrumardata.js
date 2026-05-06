
function formatarDataRelativa(dataComentario) {
    const agora = new Date();
    const data = new Date(dataComentario);
    const diffMs = agora - data;

    const diffMin = Math.floor(diffMs / 60000);
    const diffHoras = Math.floor(diffMs / 3600000);
    const diffDias = Math.floor(diffMs / 86400000);

    if (diffMin < 1) {
        return "agora mesmo";
    } else if (diffMin < 60) {
        return `há ${diffMin} minuto${diffMin > 1 ? 's' : ''}`;
    } else if (diffHoras < 24) {
        return `há ${diffHoras} hora${diffHoras > 1 ? 's' : ''}`;
    } else if (diffDias <= 6) {
        return `há ${diffDias} dia${diffDias > 1 ? 's' : ''}`;
    } else {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }
}

function atualizarDatas() {
    document.querySelectorAll(".data-comentario").forEach(el => {
        const dataOriginal = el.dataset.data;
        el.textContent = formatarDataRelativa(dataOriginal);
    });
}

atualizarDatas();
setInterval(atualizarDatas, 60000);
