<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('keluargas', function (Blueprint $table) {
            $table->foreignId('kepala_keluarga_id')->nullable()
                  ->after('alamat')
                  ->constrained('jemaats')
                  ->onDelete('set null');
            $table->date('tanggal_pernikahan')->nullable()->after('kepala_keluarga_id');
        });
    }

    public function down(): void
    {
        Schema::table('keluargas', function (Blueprint $table) {
            $table->dropForeign(['kepala_keluarga_id']);
            $table->dropColumn(['kepala_keluarga_id', 'tanggal_pernikahan']);
        });
    }
};
