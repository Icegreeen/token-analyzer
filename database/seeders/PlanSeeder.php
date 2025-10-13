<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Free',
                'slug' => 'free',
                'description' => 'Perfect for getting started with token analysis',
                'price' => 0,
                'interval' => 'monthly',
                'analyses_per_day' => 3,
                'monitored_wallets' => 1,
                'real_time_alerts' => false,
                'pdf_reports' => false,
                'advanced_analytics' => false,
                'api_access' => false,
                'is_active' => true,
            ],
            [
                'name' => 'Starter',
                'slug' => 'starter',
                'description' => 'For active traders who need more analyses',
                'price' => 9.99,
                'interval' => 'monthly',
                'analyses_per_day' => 50,
                'monitored_wallets' => 5,
                'real_time_alerts' => true,
                'pdf_reports' => true,
                'advanced_analytics' => false,
                'api_access' => false,
                'is_active' => true,
            ],
            [
                'name' => 'Pro',
                'slug' => 'pro',
                'description' => 'For professional traders and analysts',
                'price' => 29.99,
                'interval' => 'monthly',
                'analyses_per_day' => 200,
                'monitored_wallets' => 20,
                'real_time_alerts' => true,
                'pdf_reports' => true,
                'advanced_analytics' => true,
                'api_access' => false,
                'is_active' => true,
            ],
            [
                'name' => 'Enterprise',
                'slug' => 'enterprise',
                'description' => 'For teams and businesses with API access',
                'price' => 99.99,
                'interval' => 'monthly',
                'analyses_per_day' => 999999,
                'monitored_wallets' => 100,
                'real_time_alerts' => true,
                'pdf_reports' => true,
                'advanced_analytics' => true,
                'api_access' => true,
                'is_active' => true,
            ],
        ];

        foreach ($plans as $planData) {
            Plan::updateOrCreate(
                ['slug' => $planData['slug']],
                $planData
            );
        }
    }
}
