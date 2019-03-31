<template>
    <div class="popup-team-member">
        <div class="team-member-header">
            <h4 v-if="teamMemberData.data.name" class="title" :class="teamMemberColorClassByGroupName(teamMemberData.teamGroupName)">{{teamMemberData.data.name}}</h4>
            <p v-if="teamMemberData.data.position" class="text"><span>{{teamMemberData.data.position}}</span></p>
        </div>
        <div class="team-member-content">
            <div class="member-info">
                <div v-if="teamMemberData.data.figure" class="figure member-figure with-fill-shadow" :class="teamMemberColorClassByGroupName(teamMemberData.teamGroupName)">
                    <img :src="$withBase(teamMemberData.data.figure.src)" alt="">
                </div>
                <div v-if="teamMemberData.data.externalLinks" class="external-links">
                    <a v-for="externalLink in teamMemberData.data.externalLinks" :href="externalLink.link" target="blank"  class="external-link">
                        <span v-if="externalLink.icon === 'mail'" class="inline-icon mail">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="34" height="34" viewBox="0 0 34 34">
                                <defs>
                                    <path id="a" d="M0 0h34v34H0z"/>
                                </defs>
                                <g fill="none" fill-rule="evenodd">
                                    <mask id="b" fill="#fff">
                                        <use xlink:href="#a"/>
                                    </mask>
                                    <path fill="#333537" stroke="#F4F4F4" stroke-width="2" d="M17 21.251a4.264 4.264 0 0 1-4.25-4.249A4.265 4.265 0 0 1 17 12.749a4.263 4.263 0 0 1 4.249 4.253A4.262 4.262 0 0 1 17 21.251M17 8.5c-4.676 0-8.499 3.825-8.499 8.502 0 4.674 3.823 8.498 8.499 8.498h8.499c4.676 0 8.501-3.824 8.501-8.498C34 7.605 26.393 0 17 0S0 7.605 0 17.002C0 26.395 7.607 34 17 34h17v-4.249H17A12.73 12.73 0 0 1 4.25 17.002 12.733 12.733 0 0 1 17 4.249c7.054 0 12.75 5.696 12.75 12.753a4.263 4.263 0 0 1-4.251 4.249h-1.19c.723-1.276 1.19-2.68 1.19-4.249 0-4.677-3.825-8.502-8.499-8.502" mask="url(#b)"/>
                                </g>
                            </svg>
                         </span>
                        <span v-if="externalLink.icon === 'linkedin'" class="inline-icon linkedin">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                                <g fill="#FFF" fill-rule="evenodd">
                                    <path d="M15 15h-3.204v-4.744c0-1.133-.024-2.588-1.668-2.588-1.669 0-1.924 1.232-1.924 2.505V15H5V5.243h3.075v1.332h.043C8.547 5.81 9.593 5 11.154 5 14.4 5 15 7.02 15 9.649V15zM2 4C.893 4 0 3.104 0 2s.892-2 2-2a2.002 2.002 0 0 1 0 4zM0 15h3V5H0z"/>
                                </g>
                            </svg>
                        </span>
                        <span v-if="externalLink.icon === 'website'" class="inline-icon website">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" viewBox="0 0 25 25">
                                <defs>
                                    <path id="a" d="M0 0h24.5v24.5H0z"/>
                                </defs>
                                <g fill="none" fill-rule="evenodd">
                                    <mask id="b" fill="#fff">
                                        <use xlink:href="#a"/>
                                    </mask>
                                    <path fill="#FF8183" d="M5.201 16.116H2.956c-.475-1.164-.705-2.402-.705-3.779 0-1.382.23-2.62.705-3.78h2.242a19.71 19.71 0 0 0-.38 3.78c0 1.187.121 2.395.383 3.78zm5.836-.175H7.458a17.294 17.294 0 0 1-.389-3.69c0-1.22.135-2.524.392-3.78h3.576v7.47zm-5.274 2.341c.323.938.681 1.75 1.087 2.455a9.32 9.32 0 0 1-2.624-2.455h1.537zM4.225 6.307A9.326 9.326 0 0 1 6.85 3.851c-.405.704-.764 1.517-1.087 2.456H4.225zm6.9 11.975v3.68c-1.15-.52-2.203-1.856-2.899-3.68h2.898zm0-15.644v3.67H8.23c.717-1.829 1.73-3.11 2.893-3.67zm5.131 15.642c-.782 1.818-1.788 3.096-2.88 3.658V18.28h2.88zm1.305-14.43a9.334 9.334 0 0 1 2.624 2.455h-1.537c-.322-.939-.68-1.75-1.087-2.455zm-4.185 12.267V8.56h3.576c.256 1.26.391 2.561.391 3.78 0 1.217-.135 2.52-.39 3.778h-3.577zm0-9.81V2.628c1.147.52 2.201 1.855 2.897 3.68h-2.897zm6.81 11.973a9.272 9.272 0 0 1-2.623 2.455c.405-.703.764-1.515 1.087-2.455h1.536zm-.59-5.943c0-1.256-.126-2.496-.382-3.78h2.242c.474 1.164.705 2.403.705 3.78 0 1.338-.243 2.64-.706 3.78h-2.24c.25-1.26.38-2.562.38-3.78zM20.89 3.61C18.563 1.282 15.494 0 12.25 0 5.495 0 0 5.495 0 12.25S5.495 24.5 12.25 24.5 24.5 19.005 24.5 12.25c.001-3.244-1.28-6.313-3.61-8.64z" mask="url(#b)"/>
                                </g>
                            </svg>
                        </span>
                    </a>
                </div>
            </div>
            <div v-if="teamMemberData.data.description" class="member-description">
                <pre class="pre-text">{{teamMemberData.data.description}}</pre>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    @import '../../../styles/components/popup/popup';
</style>
<script>
    export default {
        props: ['teamMemberData'],
        computed: {
        },
        methods: {
            teamMemberColorClassByGroupName (groupTeamName) {
                return [
                    {
                        'blush-pink': groupTeamName === 'Management',
                        'aqua-marine': groupTeamName === 'Investors',
                        'dodger-blue': groupTeamName === 'Strategic Individual Investors',
                    }
                ]
            },
        },
        mounted () {
        },
    }
</script>