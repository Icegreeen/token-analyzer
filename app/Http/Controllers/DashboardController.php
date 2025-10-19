<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $plan = $user->currentPlan();

        // Reset counter if new day
        if (!$user->analyses_reset_date || $user->analyses_reset_date->isYesterday()) {
            $user->update([
                'analyses_today' => 0,
                'analyses_reset_date' => today(),
            ]);
        }

        $limits = [
            'analyses_today' => $user->analyses_today,
            'analyses_limit' => $plan->analyses_per_day,
            'analyses_remaining' => max(0, $plan->analyses_per_day - $user->analyses_today),
            'can_analyze' => $user->canAnalyze(),
        ];

        return Inertia::render('dashboard-enhanced', [
            'auth' => [
                'user' => $user,
            ],
            'limits' => $limits,
        ]);
    }
}




