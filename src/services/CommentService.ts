import Comment from "../models/CommentModel";
import AppError from "../utils/AppError";

class CommentService {
  findAll(taskId: string) {
    return Comment.find({ taskId }).populate("authorId").lean();
  }

  create(data: {
    taskId: string;
    teamId: string;
    authorId: string;
    content: string;
  }) {
    return Comment.create(data);
  }

  async update(
    commentId: string,
    commentUpdateAuthor: string,
    content: string
  ) {
    const comment = await Comment.findOneAndUpdate(
      {
        _id: commentId,
        authorId: commentUpdateAuthor,
      },
      { content },
      { new: true, runValidators: true, lean: true }
    );

    if (!comment) {
      throw new AppError("Comment not found or you are not the author", 403);
    }

    return comment;
  }

  async remove(commentId: string, commentUpdateAuthor: string) {
    //TODO: przerobic na findone dla bezpieczenstwa
    const comment = await Comment.findOneAndDelete({
      _id: commentId,
      authorId: commentUpdateAuthor,
    }).lean();

    if (!comment) {
      throw new AppError("Comment not found or you are not the author", 403);
    }

    return comment;
  }
}

export default new CommentService();
