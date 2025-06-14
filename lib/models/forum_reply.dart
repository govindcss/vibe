/// Represents a reply to a forum thread within an event's discussion forum.
///
/// This model mirrors the structure of the `event_forum_replies` table in the Supabase database.
/// It includes the reply message, author information, timestamp, and an optional parent reply ID for nesting.
class ForumReply {
  /// The unique identifier for the forum reply (BIGSERIAL from the database).
  final int id;

  /// The identifier of the [ForumThread] this reply belongs to.
  final int threadId;

  /// The unique identifier (UUID) of the user who posted this reply.
  /// This can be null if the user account was deleted and `ON DELETE SET NULL` is configured.
  final String? userId;

  /// The content of the forum reply.
  final String message;

  /// The timestamp when the reply was created.
  final DateTime createdAt;

  /// The identifier of the parent reply if this is a nested reply. Optional.
  final int? parentReplyId;

  /// Constructs a [ForumReply] instance.
  ForumReply({
    required this.id,
    required this.threadId,
    this.userId,
    required this.message,
    required this.createdAt,
    this.parentReplyId,
  });

  /// Creates a [ForumReply] instance from a JSON map.
  ///
  /// This factory constructor is typically used to parse data received from Supabase.
  /// It expects `created_at` to be an ISO 8601 string representation, which is then
  /// parsed into a [DateTime] object (converted to local time).
  factory ForumReply.fromJson(Map<String, dynamic> json) {
    return ForumReply(
      id: json['id'] as int,
      threadId: json['thread_id'] as int,
      userId: json['user_id'] as String?, // User ID can be null
      message: json['message'] as String,
      createdAt: DateTime.parse(json['created_at'] as String).toLocal(),
      parentReplyId: json['parent_reply_id'] as int?, // parent_reply_id can be null
    );
  }

  /// Converts this [ForumReply] instance into a JSON map.
  ///
  /// This method is typically used when sending new reply data to Supabase.
  /// Fields like `id` and `createdAt` are usually generated by the database.
  Map<String, dynamic> toJson() {
    return {
      'thread_id': threadId,
      'user_id': userId, // Should be set to the current authenticated user's ID on creation
      'message': message,
      'parent_reply_id': parentReplyId,
      // 'id' and 'created_at' are set by DB.
    };
  }

  /// Returns a string representation of the [ForumReply] instance.
  /// Useful for debugging and logging.
  @override
  String toString() {
    return 'ForumReply(id: $id, threadId: $threadId, userId: $userId, message: "$message", parentReplyId: $parentReplyId)';
  }

  /// Implements equality comparison for [ForumReply] instances.
  /// Two replies are considered equal if their [id]s are the same.
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is ForumReply && other.id == id;
  }

  /// Returns the hash code for this [ForumReply] instance, based on its [id].
  @override
  int get hashCode => id.hashCode;
}
