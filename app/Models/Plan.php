<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plan extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'interval',
        'analyses_per_day',
        'monitored_wallets',
        'real_time_alerts',
        'pdf_reports',
        'advanced_analytics',
        'api_access',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'real_time_alerts' => 'boolean',
        'pdf_reports' => 'boolean',
        'advanced_analytics' => 'boolean',
        'api_access' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }
}
