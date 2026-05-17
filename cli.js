#!/usr/bin/env node
/**
 * MiMo CLI — Xiaomi AI from terminal
 * 
 * Usage:
 *   mimo chat                          # Interactive chat
 *   mimo chat "prompt"                 # One-shot
 *   mimo models                        # List models
 *   mimo bench                         # Run benchmark
 *   mimo config                        # Show OpenClaw config
 *   mimo doctor                        # Check setup
 */
require('./src/cli');
