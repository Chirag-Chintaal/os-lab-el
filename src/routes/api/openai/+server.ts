import { json } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';

export async function POST({ request }) {
    try {
        const { messages } = await request.json();

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages,
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error?.message || 'OpenAI API request failed');
        }

        return json({
            content: data.choices[0].message.content
        });
    } catch (error) {
        return json({ error: error.message }, { status: 500 });
    }
}
