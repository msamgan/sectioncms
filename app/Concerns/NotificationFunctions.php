<?php

declare(strict_types=1);

namespace App\Concerns;

trait NotificationFunctions
{
    public function notificationGenerator(object $notifiable, string $entity, string $entityName): array
    {
        return [
            'createSubject' => config('app.name') . ' - New ' . $entity . ' has been Created',
            'createTitle' => 'A new ' . $entity . ' has been created',
            'createMessage' => $notifiable->key('name') . ' created a new ' . $entity . ' "' . $entityName . '" on ' . now()->format('F j, Y, g:i a'),

            'updateSubject' => config('app.name') . ' - ' . $entity . ' has been Updated',
            'updateTitle' => 'A ' . $entity . ' has been updated',
            'updateMessage' => $notifiable->key('name') . ' updated the ' . $entity . ' "' . $entityName . '" on ' . now()->format('F j, Y, g:i a'),

            'deleteSubject' => config('app.name') . ' - ' . $entity . ' has been Deleted',
            'deleteTitle' => 'A ' . $entity . ' has been deleted',
            'deleteMessage' => $notifiable->key('name') . ' deleted the ' . $entity . ' "' . $entityName . '" on ' . now()->format('F j, Y, g:i a'),
        ];
    }
}
