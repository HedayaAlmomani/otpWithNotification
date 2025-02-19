<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Str;
use App\Events\NewNotification;

class NotificationController extends Controller
{
    public function createNotification(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'message' => 'required|string|max:255',
            'notification_type' => 'nullable|string|max:50',
            'is_read' => 'nullable|boolean',
        ]);

        $notificationUuid = Str::uuid();

        $notification = Notification::create([
            'uuid' => $notificationUuid,
            'user_id' => $validatedData['user_id'],
            'message' => $validatedData['message'],
            'notification_type' => $validatedData['notification_type'] ?? 'info',
            'is_read' => $validatedData['is_read'] ?? false,
        ]);

        event(new NewNotification($validatedData['message']));

        return response()->json([
            'message' => 'Notification created successfully!',
            'notification' => $notification,
        ], 201);
    }

    public function getAllNotifications(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $notifications = Notification::where('user_id', $validatedData['user_id'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'notifications' => $notifications,
        ]);
    }

    public function markAsRead(Request $request, $id)
    {
        $notification = Notification::find($id);

        if (!$notification) {
            return response()->json(['message' => 'Notification not found'], 404);
        }

        $notification->update(['is_read' => true]);

        return response()->json([
            'message' => 'Notification marked as read',
            'notification' => $notification,
        ]);
    }
}
