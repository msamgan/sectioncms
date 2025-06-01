<?php

declare(strict_types=1);

use App\Actions\Section\CreateSection;
use App\Actions\Section\CreateSectionChildren;
use Random\RandomException;
use Tests\TestUserCreator;

it('returns a successful response for languages', function (): void {
    try {
        $userData = TestUserCreator::create($this);
        $business = $userData['business'];

        $response = $this->get('/api/languages', [
            'Authorization' => 'Bearer ' . $business->key('token'),
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'payload' => [
                '*' => [
                    'name',
                    'code',
                ],
            ],
        ]);
    } catch (RandomException $e) {
        $this->fail('Failed to create test user: ' . $e->getMessage());
    }
});

it('returns a successful response for languages and only active.', function (): void {
    try {
        $userData = TestUserCreator::create($this);
        $business = $userData['business'];
        $es = $userData['languages']['es'];
        $es->update(['is_active' => false]);

        $response = $this->get('/api/languages', [
            'Authorization' => 'Bearer ' . $business->key('token'),
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'payload' => [
                '*' => [
                    'name',
                    'code',
                ],
            ],
        ]);
        $response->assertJsonCount(1, 'payload');
    } catch (RandomException) {
        $this->fail('Failed to create test user');
    }
});

it('returns a successful response for sections', function (): void {
    try {
        $userData = TestUserCreator::create($this);
        $business = $userData['business'];

        $createSection = new CreateSection();
        $section = $createSection->handle([
            'name' => 'Test Section',
        ]);
        $createSectionChildren = new CreateSectionChildren();
        $createSectionChildren->handle(section: $section, fields: [
            [
                'key' => 'test_key',
                'value' => [
                    'en' => 'Test Value',
                    'es' => 'Valor de prueba',
                ],
            ],
            [
                'key' => 'another_key',
                'value' => [
                    'en' => 'Another Value',
                    'es' => 'Otro valor',
                ],
            ],
        ]);

        $response = $this->get('/api/section?id=' . $section->key('slug') . '&lang=en', [
            'Authorization' => 'Bearer ' . $business->key('token'),
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'payload' => [
                'name',
                'lang',
                'fields' => [],
            ],
        ]);
    } catch (RandomException) {
        $this->fail('Failed to create test user');
    }
});
