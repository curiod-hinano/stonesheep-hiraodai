<div class="page_body_content_share">
    <div class="page_body_content_share_wrap">
        <p>SHARE</p>
        <ul>
            <li class="facebook">
                <a href="http://www.facebook.com/share.php?u=<?php echo (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']; ?>" rel="nofollow noopener" target="_blank">
                    <?php if(is_front_page() || is_singular('feature')): ?>
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/common/facebook_blue.svg" alt="facebook">
                    <?php else: ?>
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/common/facebook.svg" alt="facebook">
                    <?php endif; ?>
                </a>
            </li>
            <li class="line">
                <a href="https://social-plugins.line.me/lineit/share?url=<?php echo (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']; ?>" target="_blank" rel="nofollow noopener">
                    <?php if(is_front_page() || is_singular('feature')): ?>
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/common/line_blue.svg" alt="line">
                    <?php else: ?>
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/public/img/common/line.svg" alt="line">
                    <?php endif; ?>
                </a>
            </li>
            <li class="copylink">
                <button onclick="copyUrl()">
                    <svg id="ios-link" xmlns="http://www.w3.org/2000/svg" width="22.902" height="22.891" viewBox="0 0 22.902 22.891">
                        <path id="パス_1012" data-name="パス 1012" d="M31.006,78.922l-.066.006a.91.91,0,0,0-.528.248L26.857,82.73a4.008,4.008,0,0,1-5.668-5.668l3.775-3.775a3.984,3.984,0,0,1,.627-.512,4.045,4.045,0,0,1,.814-.413,3.854,3.854,0,0,1,.825-.2,3.9,3.9,0,0,1,.561-.039c.077,0,.154.006.253.011a4,4,0,0,1,2.575,1.156,3.946,3.946,0,0,1,.941,1.5.866.866,0,0,0,1.062.556c.006,0,.011-.005.017-.005s.011,0,.011-.006a.86.86,0,0,0,.578-1.051,4.986,4.986,0,0,0-1.354-2.256,5.793,5.793,0,0,0-3.17-1.612c-.1-.017-.209-.033-.314-.044a5.681,5.681,0,0,0-.611-.033c-.143,0-.286.006-.424.017a5.549,5.549,0,0,0-.891.138c-.061.011-.116.028-.176.044a5.722,5.722,0,0,0-1.073.4,5.652,5.652,0,0,0-1.524,1.1l-3.775,3.775a5.8,5.8,0,0,0-1.678,4.1A5.786,5.786,0,0,0,28.112,84L31.705,80.4A.871.871,0,0,0,31.006,78.922Z" transform="translate(-18.24 -62.794)" fill="#03581D"/>
                        <path id="パス_1013" data-name="パス 1013" d="M86.089,19.929a5.8,5.8,0,0,0-8.182,0L74.4,23.435a.885.885,0,0,0,.556,1.508.894.894,0,0,0,.7-.253l3.511-3.5a4.008,4.008,0,0,1,5.668,5.668l-3.775,3.775a3.984,3.984,0,0,1-.627.512,4.045,4.045,0,0,1-.814.413,3.853,3.853,0,0,1-.825.2,3.9,3.9,0,0,1-.561.039c-.077,0-.16-.006-.253-.011A3.954,3.954,0,0,1,74.5,29.229a.879.879,0,0,0-1.051-.539.889.889,0,0,0-.622,1.128,5.027,5.027,0,0,0,1.3,2.064l.011.011a5.793,5.793,0,0,0,3.483,1.656,5.679,5.679,0,0,0,.611.033q.215,0,.429-.017a6.291,6.291,0,0,0,1.062-.176,5.724,5.724,0,0,0,1.073-.4,5.653,5.653,0,0,0,1.524-1.1L86.1,28.117a5.792,5.792,0,0,0-.011-8.188Z" transform="translate(-64.887 -18.24)" fill="#03581D"/>
                    </svg>
                </button>
            </li>
        </ul>
    </div>
</div>