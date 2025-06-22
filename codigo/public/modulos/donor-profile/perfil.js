import { UserInterface } from '../../db-interface/user-interface.js'
import { DonorInterface } from '../../db-interface/donor-interface.js'
import { PetInterface } from '../../db-interface/pet-interface.js'
import { DateElapsed } from '../../utils/date-elapsed.js'

const userInterface = new UserInterface()
const donorInterface = new DonorInterface()
const petInterface = new PetInterface()


const urlParams = new URLSearchParams(window.location.search)
const donorId = urlParams.get('donorId')

// Busca todos os pets doados por este doador
async function fetchDonatedPets() {
    try {
        const petsResponse = await petInterface.fetchPets()
        const donatedPets = petsResponse.pets.filter(pet => pet.props.donorId === donorId)

        renderPetList(donatedPets)
    } catch (error) {
        console.error('Erro ao buscar pets doados:', error)
    }
}

function redirectToDonorPage(donorId) {
    window.location.href = `/pages/donor-profile.html?donorId=${donorId}`
}

function renderPetList(petList) {
    let elements = petList.length === 0
        ? '<p id="not-pets-message">Este doador ainda não cadastrou pets</p>'
        : ''

    petList.forEach(pet => {
        elements += `
            <li>
                <img src="${pet.props.imgUrls[0]}" alt="PetProfile" class="pet-img">
                <div class="pet-info">
                    <p class="pet-name">${pet.props.name}</p>
                    <p class="pet-breed">${pet.props.breed[0]}</p>
                </div>
                <button class="donorBtn" value="${pet.props.donorId}">Ver Doador</button>
            </li>    
        `
    })

    $('#pets-content').html(elements)
}

// Carrega e exibe as informações do doador e do usuário vinculado
async function fetchAndRenderDonorInfo() {
    try {
        const { donor } = await donorInterface.getDonorById({ id: donorId })
        console.log()
        
        const user = await userInterface.getUserById({ id: donor.props.userId })

        renderDonorData(user)
    } catch (error) {
        console.error('Erro ao carregar dados do doador:', error)
    }
}

// Atualiza os campos da página com os dados do usuário vinculado ao doador
function renderDonorData({user}) {
    $('#name').text(user.name)
    $('#description').text(user.description || 'Sem descrição')
    $('#age').text(DateElapsed.getYearsPassed(user.bornAt) + ' anos')
    $('#number').text(user.phoneNumber || 'Nenhum número')
    $('#user-img').attr('src', user.imgUrl)
}

// Eventos da página
$(document).ready(async function () {
    await fetchAndRenderDonorInfo()
    await fetchDonatedPets()

    // Botão de redirecionamento de doador
    $(document).on('click', '.donorBtn', function (event) {
        redirectToDonorPage(event.target.value)
    })
})
