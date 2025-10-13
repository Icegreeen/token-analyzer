<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Alert;
use Illuminate\Http\Request;

class AlertController extends Controller
{
    /**
     * Get user's alerts
     */
    public function index(Request $request)
    {
        $query = $request->user()->alerts()
            ->with('wallet')
            ->orderBy('created_at', 'desc');

        // Filter by read status
        if ($request->has('unread') && $request->boolean('unread')) {
            $query->unread();
        }

        // Filter by severity
        if ($request->has('severity')) {
            $query->where('severity', $request->input('severity'));
        }

        $alerts = $query->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $alerts,
        ]);
    }

    /**
     * Get unread alerts count
     */
    public function unreadCount(Request $request)
    {
        $count = $request->user()->alerts()->unread()->count();

        return response()->json([
            'success' => true,
            'data' => [
                'unread_count' => $count,
            ],
        ]);
    }

    /**
     * Mark alert as read
     */
    public function markAsRead(Request $request, $id)
    {
        $alert = Alert::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $alert->markAsRead();

        return response()->json([
            'success' => true,
            'data' => $alert,
            'message' => 'Alert marked as read',
        ]);
    }

    /**
     * Mark all alerts as read
     */
    public function markAllAsRead(Request $request)
    {
        $updated = $request->user()->alerts()
            ->unread()
            ->update([
                'read' => true,
                'read_at' => now(),
            ]);

        return response()->json([
            'success' => true,
            'message' => "{$updated} alerts marked as read",
        ]);
    }

    /**
     * Delete alert
     */
    public function destroy(Request $request, $id)
    {
        $alert = Alert::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $alert->delete();

        return response()->json([
            'success' => true,
            'message' => 'Alert deleted successfully',
        ]);
    }
}
