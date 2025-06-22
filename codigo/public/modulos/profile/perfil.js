import {UserInterface} from '../../db-interface/user-interface.js'
import {PetInterface} from '../../db-interface/pet-interface.js'
import {SessionInterface} from '../../db-interface/session-interface.js'
import {CurrentSession} from '../../utils/current-session.js'
import {DateElapsed} from '../../utils/date-elapsed.js'

const sessionInterface = new SessionInterface()
const session = new CurrentSession()
const userInterface = new UserInterface()
const petInterface = new PetInterface()

async function updateUserInfo({description,imgData,name,phoneNumber}) {
    await userInterface.editUser({
        description,
        imgData,
        name,
        phoneNumber,
        userId: session.userId
    })
}

function renderSessionData() {
    $('#name').text(session.currentUser.name);
    $('#description').text(session.currentUser.description);
    $('#age').text(DateElapsed.getYearsPassed(session.currentUser.bornAt));
    $('#number').text(session.currentUser.phoneNumber);
    $('#user-img').attr('src', session.currentUser.imgUrl);
    console.log(session.currentUser)

}

$(document).ready(function () {
    renderSessionData()

    $('#edit-btn').click(function () {
        $('#edit-modal').css("display", "flex").hide().fadeIn();
        $('#edit-name').val($('#name').text().trim());
        $('#edit-description').val($('#description').text().trim());
        $('#edit-phone').val($('#phoneNumber').text()?.trim() || '');
    });

    $('#cancel-button').click(function () {
        $('#edit-modal').fadeOut();
    });

    $('#save-button').click(async function () {
        const name = $('#edit-name').val();
        const description = $('#edit-description').val();
        const imgData = $('#edit-img')[0].files[0];
        const phoneNumber = $('#edit-phone').val();

        await updateUserInfo({
            description,
            imgData,
            name,
            phoneNumber
        })
        await sessionInterface.checkSession()
        renderSessionData()
        $('#edit-modal').fadeOut();
        
    });
});
