import JSZip from 'jszip';

import * as util from '@/js/util.js'
import siteConfig from '@/config/conf.yaml'

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const stateBase64url = urlParams.get('state');

    const organizationName = siteConfig.backendRepoOwner;

    const startAuthFlowHeaders = {
        'Accept': 'application/vnd.github+json'
    };
    const clientId = siteConfig.authClientId;
    const startAuthFlowResponse = await fetch(
        `https://github.com/login/device/code?client_id=${clientId}`,
        {
            method: 'POST',
            headers: startAuthFlowHeaders
        }
    );
    const responseData = response.json();
    
    const userCodeDiv = document.getElementById('user-code');
    userCodeDiv.textContent = responseData['user_code'];

    const userCodeContainerDiv = document.getElementById('user-code-container');
    userCodeContainerDiv.style.display = 'block';

    /*

    // Store access token and refresh token in cookies. Subtract 20 seconds
    // from expiration times so that they'll expire slightly early, alerting the
    // browser to refresh the access token or restart the auth flow
    // BEFORE dispatching a backend workflow.
    let accessTokenMaxAge = null;
    if (responseData.accessTokenExpiresInSeconds !== null) {
        accessTokenMaxAge = responseData.accessTokenExpiresInSeconds - 20;
    }
    
    let refreshTokenMaxAge = null;
    if (responseData.refreshTokenExpiresInSeconds !== null) {
        refreshTokenMaxAge = responseData.refreshTokenExpiresInSeconds - 20;
    }

    util.setCookie('accessToken', responseData.accessToken, '/', accessTokenMaxAge);
    util.setCookie('refreshToken', responseData.refreshToken, '/', refreshTokenMaxAge);

    // Redirect user back to where they were when auth flow started
    const state = JSON.parse(
        new TextDecoder().decode(
            Uint8Array.fromBase64(
                stateBase64url,
                { alphabet: 'base64url' }
            )
        )
    )
    window.location.replace(state.originatingUrl);
    */
});
