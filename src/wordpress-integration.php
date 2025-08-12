<?php
/**
 * Plugin Name: Running Agent IA - DeepSeek
 * Description: Agente de IA para running integrado con DeepSeek
 * Version: 1.0.0
 * Author: Tu Nombre
 */

// Prevenir acceso directo
if (!defined('ABSPATH')) {
    exit;
}

class RunningAgentIA {
    
    public function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_shortcode('running_agent_ia', array($this, 'render_agent'));
        add_action('wp_ajax_deepseek_chat', array($this, 'handle_deepseek_request'));
        add_action('wp_ajax_nopriv_deepseek_chat', array($this, 'handle_deepseek_request'));
    }
    
    public function enqueue_scripts() {
        // Encolar los archivos CSS y JS compilados de React
        wp_enqueue_script(
            'running-agent-js',
            plugin_dir_url(__FILE__) . 'dist/assets/index.js',
            array(),
            '1.0.0',
            true
        );
        
        wp_enqueue_style(
            'running-agent-css',
            plugin_dir_url(__FILE__) . 'dist/assets/index.css',
            array(),
            '1.0.0'
        );
        
        // Pasar datos a JavaScript
        wp_localize_script('running-agent-js', 'runningAgentAjax', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('deepseek_nonce')
        ));
    }
    
    public function render_agent($atts) {
        $atts = shortcode_atts(array(
            'height' => '600px',
            'theme' => 'default'
        ), $atts);
        
        return '<div id="running-agent-container" style="height: ' . esc_attr($atts['height']) . ';"></div>';
    }
    
    public function handle_deepseek_request() {
        // Verificar nonce de seguridad
        if (!wp_verify_nonce($_POST['nonce'], 'deepseek_nonce')) {
            wp_die('Error de seguridad');
        }
        
        $message = sanitize_text_field($_POST['message']);
        $api_key = get_option('deepseek_api_key');
        
        if (empty($api_key)) {
            wp_send_json_error('API key no configurada');
            return;
        }
        
        // Llamada a la API de DeepSeek
        $response = wp_remote_post('https://api.deepseek.com/v1/chat/completions', array(
            'headers' => array(
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $api_key
            ),
            'body' => json_encode(array(
                'model' => 'deepseek-chat',
                'messages' => array(
                    array(
                        'role' => 'system',
                        'content' => 'Eres un experto entrenador de running y nutricionista deportivo. Proporciona consejos precisos, motivadores y personalizados sobre running, entrenamiento, nutrición deportiva, prevención de lesiones y técnicas de carrera. Responde siempre en español de manera amigable y profesional.'
                    ),
                    array(
                        'role' => 'user',
                        'content' => $message
                    )
                ),
                'max_tokens' => 1000,
                'temperature' => 0.7
            )),
            'timeout' => 30
        ));
        
        if (is_wp_error($response)) {
            wp_send_json_error('Error de conexión con DeepSeek');
            return;
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        if (isset($data['choices'][0]['message']['content'])) {
            wp_send_json_success($data['choices'][0]['message']['content']);
        } else {
            wp_send_json_error('Error en la respuesta de DeepSeek');
        }
    }
}

// Inicializar el plugin
new RunningAgentIA();

// Añadir página de configuración en el admin
add_action('admin_menu', 'running_agent_admin_menu');

function running_agent_admin_menu() {
    add_options_page(
        'Running Agent IA Settings',
        'Running Agent IA',
        'manage_options',
        'running-agent-settings',
        'running_agent_settings_page'
    );
}

function running_agent_settings_page() {
    if (isset($_POST['submit'])) {
        update_option('deepseek_api_key', sanitize_text_field($_POST['deepseek_api_key']));
        echo '<div class="notice notice-success"><p>Configuración guardada!</p></div>';
    }
    
    $api_key = get_option('deepseek_api_key', '');
    ?>
    <div class="wrap">
        <h1>Running Agent IA - Configuración</h1>
        <form method="post" action="">
            <table class="form-table">
                <tr>
                    <th scope="row">DeepSeek API Key</th>
                    <td>
                        <input type="password" name="deepseek_api_key" value="<?php echo esc_attr($api_key); ?>" class="regular-text" />
                        <p class="description">Introduce tu API key de DeepSeek</p>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
        
        <h2>Uso del Shortcode</h2>
        <p>Para mostrar el agente en cualquier página o post, usa el siguiente shortcode:</p>
        <code>[running_agent_ia]</code>
        
        <h3>Parámetros opcionales:</h3>
        <ul>
            <li><code>height</code> - Altura del contenedor (por defecto: 600px)</li>
            <li><code>theme</code> - Tema visual (por defecto: default)</li>
        </ul>
        
        <p>Ejemplo: <code>[running_agent_ia height="800px"]</code></p>
    </div>
    <?php
}
?>