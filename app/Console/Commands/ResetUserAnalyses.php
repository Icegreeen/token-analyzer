<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class ResetUserAnalyses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:reset-analyses {user_id? : The ID of the user (optional, resets all if not provided)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset user analysis counter for development/testing';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $userId = $this->argument('user_id');

        if ($userId) {
            // Reset specific user
            $user = User::find($userId);
            
            if (!$user) {
                $this->error("User with ID {$userId} not found!");
                return 1;
            }

            $user->update([
                'analyses_today' => 0,
                'analyses_reset_date' => today(),
            ]);

            $this->info("✅ User {$user->name} (ID: {$userId}) analysis counter reset!");
            $this->info("   Analyses available: {$user->currentPlan()->analyses_per_day}/day");
        } else {
            // Reset all users
            $count = User::query()->update([
                'analyses_today' => 0,
                'analyses_reset_date' => today(),
            ]);

            $this->info("✅ Reset analysis counter for {$count} user(s)!");
        }

        return 0;
    }
}
